import {
  createSignInMessage,
  createEip712DocForWalletGeneration,
  createHdFacilitatorGroupFromEntropy,
  queryDepositCount,
  hexToBytes,
  quoteResponseToEip712Document,
  parseTransactionRequestForViem,
  caip19FungibleEvmToken,
  DeliveryMethod,
  FacilitatorKeyType,
  PublicKeyArgGroups,
} from '@silentswap/sdk';
import BigNumber from 'bignumber.js';

/**
 * Authenticate and derive entropy
 */
export async function authenticateAndDeriveEntropy(silentswap, signer) {
  // Get nonce
  const [nonceError, nonceResponse] = await silentswap.nonce(signer.address);
  if (!nonceResponse || nonceError) {
    throw new Error(`Failed to get nonce: ${nonceError?.type}: ${nonceError?.error}`);
  }

  // Create sign-in message
  const signInMessage = createSignInMessage(
    signer.address,
    nonceResponse.nonce,
    'silentswap.com'
  );

  // Sign message
  const siweSignature = await signer.signEip191Message(signInMessage.message);

  // Authenticate
  const [authError, authResponse] = await silentswap.authenticate({
    siwe: {
      message: signInMessage.message,
      signature: siweSignature,
    },
  });

  if (!authResponse || authError) {
    throw new Error(`Failed to authenticate: ${authError?.type}: ${authError?.error}`);
  }

  // Derive entropy from auth token
  const eip712Doc = createEip712DocForWalletGeneration(authResponse.secretToken);
  const entropy = await signer.signEip712TypedData(eip712Doc);

  return entropy;
}

/**
 * Create facilitator group
 */
export async function createFacilitatorGroup(entropy, userAddress) {
  const depositCount = await queryDepositCount(userAddress);
  const group = await createHdFacilitatorGroupFromEntropy(
    hexToBytes(entropy),
    depositCount
  );
  
  return { group, depositCount };
}

/**
 * Get quote for silent swap
 */
export async function getSwapQuote({
  silentswap,
  signer,
  group,
  recipientAddress,
  tokenAddress,
  tokenAmount,
  tokenDecimals,
  chainId = 1,
}) {
  // Derive viewer account
  const viewer = await group.viewer();
  const { publicKeyBytes: pk65_viewer } = viewer.exportPublicKey(
    '*',
    FacilitatorKeyType.SECP256K1
  );

  // Export public keys for facilitator group
  const groupPublicKeys = await group.exportPublicKeys(1, [
    ...PublicKeyArgGroups.GENERIC,
  ]);

  // Request quote
  const [quoteError, quoteResponse] = await silentswap.quote({
    signer: signer.address,
    viewer: pk65_viewer,
    outputs: [
      {
        method: DeliveryMethod.SNIP,
        recipient: recipientAddress,
        asset: caip19FungibleEvmToken(chainId, tokenAddress),
        value: BigNumber(tokenAmount).shiftedBy(tokenDecimals).toFixed(0),
        facilitatorPublicKeys: groupPublicKeys[0],
      },
    ],
  });

  if (quoteError || !quoteResponse) {
    throw new Error(`Failed to get quote: ${quoteError?.type}: ${quoteError?.error}`);
  }

  return quoteResponse;
}

/**
 * Create order
 */
export async function createOrder({
  silentswap,
  signer,
  group,
  quoteResponse,
  metadata,
}) {
  // Sign authorizations
  const signedAuths = await Promise.all(
    quoteResponse.authorizations.map(async (g_auth) => ({
      ...g_auth,
      signature: await (async () => {
        if ('eip3009_deposit' === g_auth.type) {
          return await signer.signEip712TypedData(g_auth.eip712);
        }
        throw Error(`Authorization instruction type not implemented: ${g_auth.type}`);
      })(),
    }))
  );

  // Sign the order's EIP-712
  const orderDoc = quoteResponseToEip712Document(quoteResponse);
  const signedQuote = await signer.signEip712TypedData(orderDoc);

  // Approve proxy authorizations
  const facilitatorReplies = await group.approveProxyAuthorizations(
    quoteResponse.facilitators,
    {
      proxyPublicKey: silentswap.proxyPublicKey,
    }
  );

  // Place the order
  const [orderError, orderResponse] = await silentswap.order({
    quote: quoteResponse.quote,
    quoteId: quoteResponse.quoteId,
    authorizations: signedAuths,
    eip712Domain: orderDoc.domain,
    signature: signedQuote,
    facilitators: facilitatorReplies,
    metadata,
  });

  if (orderError || !orderResponse) {
    throw new Error(`Failed to place order: ${orderError?.type}: ${orderError?.error}`);
  }

  return orderResponse;
}

/**
 * Execute deposit transaction
 */
export async function executeDeposit(client, orderResponse) {
  // Parse transaction request
  const txRequestParams = parseTransactionRequestForViem(orderResponse.transaction);

  // Send transaction
  const hash = await client.sendTransaction(txRequestParams);

  // Wait for confirmation
  const txReceipt = await client.waitForTransactionReceipt({ hash });

  return {
    hash,
    receipt: txReceipt,
    depositAmount: orderResponse.response.order.deposit,
  };
}

/**
 * Complete silent swap flow
 */
export async function executeSilentSwap({
  silentswap,
  signer,
  client,
  recipientAddress,
  tokenAddress,
  tokenAmount,
  tokenDecimals = 6,
  chainId = 1,
}) {
  const steps = [];
  
  try {
    // Step 1: Authenticate
    steps.push('Authenticating with SilentSwap...');
    const entropy = await authenticateAndDeriveEntropy(silentswap, signer);
    steps.push('✓ Authentication successful');

    // Step 2: Create facilitator group
    steps.push('Creating facilitator group...');
    const { group, depositCount } = await createFacilitatorGroup(entropy, signer.address);
    steps.push(`✓ Facilitator group created (deposit count: ${depositCount})`);

    // Step 3: Get quote
    steps.push('Requesting quote...');
    const quoteResponse = await getSwapQuote({
      silentswap,
      signer,
      group,
      recipientAddress,
      tokenAddress,
      tokenAmount,
      tokenDecimals,
      chainId,
    });
    steps.push(`✓ Quote received (Order ID: ${quoteResponse.quoteId})`);

    // Step 4: Create order
    steps.push('Signing authorizations and creating order...');
    const orderResponse = await createOrder({
      silentswap,
      signer,
      group,
      quoteResponse,
    });
    steps.push(`✓ Order created (Order ID: ${orderResponse.response.orderId})`);

    // Step 5: Execute deposit
    steps.push('Executing deposit transaction...');
    const depositResult = await executeDeposit(client, orderResponse);
    steps.push(`✓ Deposit transaction sent: ${depositResult.hash}`);

    return {
      success: true,
      data: {
        orderId: orderResponse.response.orderId,
        depositHash: depositResult.hash,
        depositAmount: depositResult.depositAmount,
        quoteId: quoteResponse.quoteId,
      },
      steps,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      steps,
    };
  }
}
