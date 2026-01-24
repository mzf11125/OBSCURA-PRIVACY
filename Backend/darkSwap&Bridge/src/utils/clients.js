import { createWalletClient, http, publicActions } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet, avalanche } from 'viem/chains';
import { Connection, Keypair } from '@solana/web3.js';
import { 
  createSilentSwapClient, 
  createViemSigner,
  ENVIRONMENT 
} from '@silentswap/sdk';
import { config } from '../config/index.js';

// EVM Clients
export function createEvmClients() {
  const account = privateKeyToAccount(config.evm.privateKey);
  
  const ethereumClient = createWalletClient({
    account,
    chain: mainnet,
    transport: http(config.evm.rpcUrls.ethereum),
  }).extend(publicActions);
  
  const avalancheClient = createWalletClient({
    account,
    chain: avalanche,
    transport: http(config.evm.rpcUrls.avalanche),
  }).extend(publicActions);
  
  const signer = createViemSigner(account, avalancheClient);
  
  return {
    account,
    ethereumClient,
    avalancheClient,
    signer,
  };
}

// Solana Client
export function createSolanaClient() {
  if (!config.solana.secretKey) {
    return null;
  }
  
  const keypair = Keypair.fromSecretKey(Buffer.from(config.solana.secretKey));
  const connection = new Connection(config.solana.rpcUrl, 'confirmed');
  
  return {
    keypair,
    connection,
    address: keypair.publicKey.toString(),
  };
}

// SilentSwap Client
export function createSilentSwapClientInstance() {
  return createSilentSwapClient({
    environment: config.silentswap.environment === 'mainnet' ? ENVIRONMENT.MAINNET : ENVIRONMENT.TESTNET,
    baseUrl: config.silentswap.apiUrl,
  });
}
