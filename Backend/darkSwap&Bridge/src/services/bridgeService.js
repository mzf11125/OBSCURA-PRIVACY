import { 
  getBridgeQuote, 
  convertQuoteResultToQuote,
  executeBridgeTransaction,
  getBridgeStatus,
  solveOptimalUsdcAmount 
} from '@silentswap/sdk';
import BigNumber from 'bignumber.js';

/**
 * Get bridge quote from multiple providers
 */
export async function getQuote({
  srcChainId,
  srcToken,
  srcAmount,
  dstChainId,
  dstToken,
  userAddress,
}) {
  try {
    const quoteResult = await getBridgeQuote(
      srcChainId,
      srcToken,
      srcAmount,
      dstChainId,
      dstToken,
      userAddress
    );
    
    return {
      success: true,
      data: {
        provider: quoteResult.provider,
        outputAmount: quoteResult.outputAmount,
        inputAmount: quoteResult.inputAmount,
        feeUsd: quoteResult.feeUsd,
        slippage: quoteResult.slippage,
        estimatedTime: quoteResult.estimatedTime,
        retentionRate: quoteResult.retentionRate,
        txCount: quoteResult.txCount,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Execute bridge transaction
 */
export async function executeBridge({
  srcChainId,
  srcToken,
  srcAmount,
  dstChainId,
  dstToken,
  userAddress,
  walletClient,
  connector,
}) {
  const steps = [];
  
  try {
    // Step 1: Get quote
    steps.push('Fetching bridge quote...');
    const quoteResult = await getBridgeQuote(
      srcChainId,
      srcToken,
      srcAmount,
      dstChainId,
      dstToken,
      userAddress
    );
    
    steps.push(`Quote received from ${quoteResult.provider}`);
    
    // Step 2: Convert to executable quote
    const quote = convertQuoteResultToQuote(quoteResult, srcChainId);
    
    // Step 3: Execute transaction
    steps.push('Executing bridge transaction...');
    const status = await executeBridgeTransaction(
      quote,
      walletClient,
      connector,
      (step) => steps.push(step)
    );
    
    return {
      success: true,
      data: {
        status: status.status,
        txHashes: status.txHashes,
        requestId: status.requestId,
        provider: quoteResult.provider,
        steps,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      steps,
    };
  }
}

/**
 * Check bridge transaction status
 */
export async function checkStatus(requestId, provider) {
  try {
    const status = await getBridgeStatus(requestId, provider);
    
    return {
      success: true,
      data: status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Solve optimal USDC amount for bridge with deposit
 */
export async function solveUsdcAmount({
  srcChainId,
  srcToken,
  srcAmount,
  userAddress,
  depositCalldata,
  maxImpactPercent,
}) {
  try {
    const result = await solveOptimalUsdcAmount(
      srcChainId,
      srcToken,
      srcAmount,
      userAddress,
      depositCalldata,
      maxImpactPercent
    );
    
    return {
      success: true,
      data: {
        usdcAmountOut: result.usdcAmountOut.toString(),
        actualAmountIn: result.actualAmountIn.toString(),
        provider: result.provider,
        allowanceTarget: result.allowanceTarget,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Poll bridge status until completion
 */
export async function pollBridgeStatus(requestId, provider, maxAttempts = 60, intervalMs = 5000) {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await getBridgeStatus(requestId, provider);
    
    if (status.status === 'success' || status.status === 'failed' || status.status === 'refund') {
      return {
        success: true,
        data: status,
        attempts: i + 1,
      };
    }
    
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
  
  return {
    success: false,
    error: 'Bridge status polling timeout',
    attempts: maxAttempts,
  };
}
