# OBSCURA

<p align="center">
  <strong>Privacy-Preserving DeFi Infrastructure for Web3</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#components">Components</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Solana-Devnet-purple.svg" alt="Solana">
  <img src="https://img.shields.io/badge/Ethereum-Sepolia-blue.svg" alt="Ethereum">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</p>

---

## Overview

OBSCURA is a comprehensive privacy-focused DeFi ecosystem enabling secure, private trading across multiple blockchains. Built with cutting-edge cryptographic technologies including Zero-Knowledge Proofs, Multi-Party Computation (MPC), and Post-Quantum Signatures, OBSCURA provides institutional-grade privacy for decentralized finance.

## Features

### 🔒 Privacy-First Design

- **Zero-Knowledge Proofs** - Transaction details hidden while maintaining verifiability
- **Stealth Addresses** - Unlinkable one-time addresses for each transaction
- **WOTS+ Post-Quantum Signatures** - Future-proof cryptographic security
- **Encrypted Order Flow** - MEV protection and front-running prevention

### 💱 Trading Infrastructure

- **Dark Pool Trading** - Private order matching via Arcium MPC
- **OTC RFQ System** - Privacy-preserving Request for Quote trading
- **Cross-Chain Bridge** - Seamless multi-chain asset transfers
- **Silent Swap** - Private, non-custodial token swaps

### 🛡️ Compliance & Security

- **Regulatory Compliance** - Address screening via Range API
- **Relayer Network** - Private transaction submission
- **Off-Chain Balance Tracking** - Encrypted balance management via Arcium cSPL

## Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                          OBSCURA                                  │
├───────────────────────────────────────────────────────────────────┤
│  Frontend                                                         │
│  ├── Web App (Next.js + Tailwind + Solana React Hooks)           │
│  └── Mobile App (Expo + React Native + Mobile Wallet Adapter)    │
├───────────────────────────────────────────────────────────────────┤
│  Backend Services                                                 │
│  ├── darkPool      → MPC-based private order matching            │
│  ├── darkOTC       → Privacy-preserving RFQ system               │
│  ├── darkSwap      → Private cross-chain swaps & bridge          │
│  └── Compliance    → Address compliance checking                 │
├───────────────────────────────────────────────────────────────────┤
│  Privacy Infrastructure                                           │
│  ├── Arcium SDK    → MPC encrypted computation                   │
│  ├── Light Protocol→ ZK compression (1000x storage savings)      │
│  ├── WOTS+         → Post-quantum signatures                     │
│  └── Elusiv        → Private settlement layer                    │
├───────────────────────────────────────────────────────────────────┤
│  Blockchain Layer                                                 │
│  ├── Solana Devnet                                               │
│  └── Ethereum Sepolia                                            │
└───────────────────────────────────────────────────────────────────┘
```

## Components

### Backend

| Component                                        | Description                                                                     | Tech Stack                     |
| ------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------ |
| **[darkPool](./Backend/darkPool)**               | Production-ready dark pool trading with encrypted order matching via Arcium MPC | Node.js, Redis, Solana, Arcium |
| **[darkOTC](./Backend/darkOTC)**                 | Privacy-preserving RFQ system with stealth addresses and WOTS+ signatures       | Express, TypeScript, Supabase  |
| **[darkSwap&Bridge](./Backend/darkSwap&Bridge)** | Cross-chain bridging and private swaps using SilentSwap SDK                     | Node.js, SilentSwap SDK        |
| **[Compliance](./Backend/Compliance)**           | Address compliance checking against Range API for sanctions & blacklists        | Node.js, Range API             |

### Frontend

| Component                                            | Description                                       | Tech Stack                                           |
| ---------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
| **[Web App](./Frontend/web/obscura)**                | Modern web interface for OBSCURA DeFi operations  | Next.js 16, React 19, Tailwind 4, Solana React Hooks |
| **[Mobile App](./Frontend/mobile-app/obscura-dapp)** | Native mobile application with wallet integration | Expo 54, React Native, Mobile Wallet Adapter         |

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- Redis (for darkPool)
- Solana CLI (optional, for development)
- Docker (optional, for containerized deployment)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/Daemon-protocol/OBSCURA-PRIVACY.git
   cd OBSCURA-PRIVACY
   ```

2. **Backend Setup** (choose component)

   ```bash
   # Dark Pool
   cd Backend/darkPool
   npm install
   cp .env.example .env
   npm start

   # Dark OTC
   cd Backend/darkOTC
   npm install
   cp .env.example .env
   npm run dev

   # Dark Swap & Bridge
   cd Backend/darkSwap&Bridge
   npm install
   cp .env.example .env
   npm start

   # Compliance
   cd Backend/Compliance
   npm install
   cp .env.example .env
   npm start
   ```

3. **Frontend Setup**

   ```bash
   # Web App
   cd Frontend/web/obscura
   npm install
   npm run dev

   # Mobile App
   cd Frontend/mobile-app/obscura-dapp
   npm install
   npm run dev
   ```

## Privacy Model

### Visible (Fair Trading)

- Asset pairs, directions, amounts, and prices
- Quote counts and expiration times
- Transaction timestamps

### Hidden (Privacy Protected)

- User identities via stealth addresses
- Transaction linkability via WOTS+ one-time signatures
- Settlement details via ZK proofs
- On-chain activity via relayer network

## Technology Stack

### Core Technologies

| Technology                  | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| **Arcium SDK v0.6.3**       | MPC-based encrypted computation           |
| **Light Protocol**          | ZK compression for Solana (1000x cheaper) |
| **WOTS+ (mochimo-wots-v2)** | Post-quantum one-time signatures          |
| **SilentSwap SDK**          | Private cross-chain swaps                 |
| **Range API**               | Compliance & sanctions screening          |

### Blockchain Networks

- **Solana Devnet** - Primary chain for high-performance DeFi
- **Ethereum Sepolia** - EVM compatibility for cross-chain operations

## API Documentation

Each backend service includes comprehensive API documentation:

- [Dark Pool API](./Backend/darkPool/README.md#-api-endpoints)
- [Dark OTC API](./Backend/darkOTC/README.md#api-documentation)
- [Dark Swap & Bridge API](./Backend/darkSwap&Bridge/README.md#api-endpoints)
- [Compliance API](./Backend/Compliance/README.md#api-endpoints)

## Security

### Cryptographic Primitives

- **WOTS+ Signatures** - Post-quantum secure (2208 bytes)
- **Stealth Addresses** - Unlinkable one-time addresses
- **Pedersen Commitments** - Cryptographic hiding of amounts
- **Nullifiers** - Double-spending prevention
- **x25519 ECDH** - Secure key exchange with Rescue cipher

### Security Features

- MEV protection through encrypted order flow
- Signature reuse prevention
- Rate limiting and DDoS protection
- Comprehensive audit logging

## Deployment

### Docker

```bash
# Dark Pool
cd Backend/darkPool
docker build -t obscura-darkpool .
docker run -p 3001:3001 --env-file .env obscura-darkpool

# Dark OTC
cd Backend/darkOTC
docker build -t obscura-darkotc .
docker run -p 3000:3000 --env-file .env obscura-darkotc
```

### Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app)

See individual component READMEs for detailed deployment instructions.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

⚠️ **This is a testnet/devnet implementation for development and testing purposes. Do not use with real funds on mainnet without proper security audits.**

## Links

- **Arcium Docs**: https://docs.arcium.com
- **Light Protocol**: https://lightprotocol.com
- **SilentSwap**: https://docs.silentswap.com
- **Solana Explorer**: https://explorer.solana.com/?cluster=devnet
- **Sepolia Explorer**: https://sepolia.etherscan.io

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Daemon-protocol">Daemon Protocol</a>
</p>
