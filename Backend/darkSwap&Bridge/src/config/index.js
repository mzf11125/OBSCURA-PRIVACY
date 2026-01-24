import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  evm: {
    privateKey: process.env.EVM_PRIVATE_KEY,
    rpcUrls: {
      ethereum: process.env.EVM_RPC_URL_ETHEREUM || 'https://eth.llamarpc.com',
      avalanche: process.env.EVM_RPC_URL_AVALANCHE || 'https://api.avax.network/ext/bc/C/rpc',
    },
  },
  
  solana: {
    secretKey: process.env.SOLANA_SECRET_KEY ? JSON.parse(process.env.SOLANA_SECRET_KEY) : null,
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
  },
  
  silentswap: {
    apiUrl: process.env.SILENTSWAP_API_URL || 'https://api.silentswap.com',
    environment: process.env.SILENTSWAP_ENVIRONMENT || 'mainnet',
  },
  
  security: {
    apiKey: process.env.API_KEY,
  },
};

// Validate required configuration
export function validateConfig() {
  const errors = [];
  
  if (!config.evm.privateKey) {
    errors.push('EVM_PRIVATE_KEY is required');
  }
  
  if (errors.length > 0) {
    throw new Error(`Configuration errors:\n${errors.join('\n')}`);
  }
}
