# darkSwap & Bridge Backend

Backend service for darkSwap and Bridge operations using SilentSwap SDK. Provides REST API endpoints for cross-chain bridging and private swaps.

## Features

- **Bridge Operations**: Cross-chain token bridging with multiple provider support (Relay, deBridge)
- **Silent Swap**: Private, non-custodial cross-chain swaps
- **Quote Management**: Get optimal quotes from multiple providers
- **Status Monitoring**: Track bridge and swap transaction status
- **Type Safe**: Full TypeScript/JavaScript support

## Installation

```bash
npm install
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

2. Configure your environment variables:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# EVM Configuration (REQUIRED)
EVM_PRIVATE_KEY=0x...
EVM_RPC_URL_ETHEREUM=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
EVM_RPC_URL_AVALANCHE=https://api.avax.network/ext/bc/C/rpc

# Solana Configuration (optional)
SOLANA_SECRET_KEY=[]
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# SilentSwap Configuration
SILENTSWAP_API_URL=https://api.silentswap.com
SILENTSWAP_ENVIRONMENT=mainnet

# API Security (optional)
API_KEY=your-secret-api-key
```

## Usage

### Start the server

```bash
npm start
```

### Development mode (with auto-reload)

```bash
npm run dev
```

## API Endpoints

### Health Check

```http
GET /api/health
```

### Bridge Operations

#### Get Bridge Quote

```http
POST /api/bridge/quote
Content-Type: application/json

{
  "srcChainId": 1,
  "srcToken": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "srcAmount": "1000000",
  "dstChainId": 43114,
  "dstToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  "userAddress": "0x..."
}
```

#### Execute Bridge

```http
POST /api/bridge/execute
Content-Type: application/json

{
  "srcChainId": 1,
  "srcToken": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "srcAmount": "1000000",
  "dstChainId": 43114,
  "dstToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"
}
```

#### Check Bridge Status

```http
GET /api/bridge/status/:requestId?provider=relay
```

#### Solve Optimal USDC Amount

```http
POST /api/bridge/solve-usdc
Content-Type: application/json

{
  "srcChainId": 1,
  "srcToken": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "srcAmount": "1000000",
  "userAddress": "0x...",
  "depositCalldata": "0x...",
  "maxImpactPercent": 3.0
}
```

### Silent Swap Operations

#### Execute Silent Swap

```http
POST /api/swap/execute
Content-Type: application/json

{
  "recipientAddress": "0x...",
  "tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "tokenAmount": "10",
  "tokenDecimals": 6,
  "chainId": 1
}
```

#### Get Swap Quote

```http
POST /api/swap/quote
Content-Type: application/json

{
  "recipientAddress": "0x...",
  "tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "tokenAmount": "10",
  "tokenDecimals": 6,
  "chainId": 1
}
```

## API Authentication

If `API_KEY` is set in `.env`, include it in request headers:

```http
X-API-Key: your-secret-api-key
```

## Project Structure

```
Backend/darkSwap&Bridge/
├── src/
│   ├── config/
│   │   └── index.js           # Configuration management
│   ├── middleware/
│   │   ├── auth.js            # Authentication middleware
│   │   └── errorHandler.js   # Error handling
│   ├── routes/
│   │   ├── health.js          # Health check routes
│   │   ├── bridge.js          # Bridge operation routes
│   │   └── swap.js            # Silent swap routes
│   ├── services/
│   │   ├── bridgeService.js   # Bridge business logic
│   │   └── silentSwapService.js # Silent swap business logic
│   ├── utils/
│   │   └── clients.js         # Client initialization
│   └── server.js              # Express server setup
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Examples

### Bridge 1 USDC from Ethereum to Avalanche

```bash
curl -X POST http://localhost:3000/api/bridge/quote \
  -H "Content-Type: application/json" \
  -d '{
    "srcChainId": 1,
    "srcToken": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "srcAmount": "1000000",
    "dstChainId": 43114,
    "dstToken": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "userAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  }'
```

### Execute Silent Swap

```bash
curl -X POST http://localhost:3000/api/swap/execute \
  -H "Content-Type: application/json" \
  -d '{
    "recipientAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "tokenAmount": "10",
    "tokenDecimals": 6,
    "chainId": 1
  }'
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

## Security

- Store private keys securely (use environment variables)
- Enable API key authentication in production
- Use HTTPS in production
- Implement rate limiting for production use
- Never commit `.env` file to version control

## Support

For issues or questions:
- Check the [SilentSwap SDK documentation](https://docs.silentswap.com)
- Review the `resources.md` file for detailed examples

## License

MIT
