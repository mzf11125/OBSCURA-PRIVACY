import express from 'express';
import * as bridgeService from '../services/bridgeService.js';
import { createEvmClients } from '../utils/clients.js';

const router = express.Router();

/**
 * GET /api/bridge/quote
 * Get bridge quote from multiple providers
 */
router.post('/quote', async (req, res, next) => {
  try {
    const {
      srcChainId,
      srcToken,
      srcAmount,
      dstChainId,
      dstToken,
      userAddress,
    } = req.body;
    
    // Validate required fields
    if (!srcChainId || !srcToken || !srcAmount || !dstChainId || !dstToken || !userAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: srcChainId, srcToken, srcAmount, dstChainId, dstToken, userAddress',
      });
    }
    
    const result = await bridgeService.getQuote({
      srcChainId,
      srcToken,
      srcAmount,
      dstChainId,
      dstToken,
      userAddress,
    });
    
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/bridge/execute
 * Execute bridge transaction
 */
router.post('/execute', async (req, res, next) => {
  try {
    const {
      srcChainId,
      srcToken,
      srcAmount,
      dstChainId,
      dstToken,
    } = req.body;
    
    // Validate required fields
    if (!srcChainId || !srcToken || !srcAmount || !dstChainId || !dstToken) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: srcChainId, srcToken, srcAmount, dstChainId, dstToken',
      });
    }
    
    const { account, avalancheClient } = createEvmClients();
    
    // Simple connector implementation
    const connector = {
      switchChain: async ({ chainId }) => {
        console.log(`Switching to chain ${chainId}`);
      },
    };
    
    const result = await bridgeService.executeBridge({
      srcChainId,
      srcToken,
      srcAmount,
      dstChainId,
      dstToken,
      userAddress: account.address,
      walletClient: avalancheClient,
      connector,
    });
    
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/bridge/status/:requestId
 * Check bridge transaction status
 */
router.get('/status/:requestId', async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { provider } = req.query;
    
    if (!provider) {
      return res.status(400).json({
        success: false,
        error: 'Missing required query parameter: provider',
      });
    }
    
    const result = await bridgeService.checkStatus(requestId, provider);
    
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/bridge/solve-usdc
 * Solve optimal USDC amount for bridge with deposit
 */
router.post('/solve-usdc', async (req, res, next) => {
  try {
    const {
      srcChainId,
      srcToken,
      srcAmount,
      userAddress,
      depositCalldata,
      maxImpactPercent,
    } = req.body;
    
    // Validate required fields
    if (!srcChainId || !srcToken || !srcAmount || !userAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: srcChainId, srcToken, srcAmount, userAddress',
      });
    }
    
    const result = await bridgeService.solveUsdcAmount({
      srcChainId,
      srcToken,
      srcAmount,
      userAddress,
      depositCalldata,
      maxImpactPercent,
    });
    
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/bridge/poll-status
 * Poll bridge status until completion
 */
router.post('/poll-status', async (req, res, next) => {
  try {
    const { requestId, provider, maxAttempts, intervalMs } = req.body;
    
    if (!requestId || !provider) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: requestId, provider',
      });
    }
    
    const result = await bridgeService.pollBridgeStatus(
      requestId,
      provider,
      maxAttempts,
      intervalMs
    );
    
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
