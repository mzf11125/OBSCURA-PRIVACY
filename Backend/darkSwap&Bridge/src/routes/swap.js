import express from 'express';
import * as silentSwapService from '../services/silentSwapService.js';
import { createEvmClients, createSilentSwapClientInstance } from '../utils/clients.js';

const router = express.Router();

/**
 * POST /api/swap/execute
 * Execute silent swap
 */
router.post('/execute', async (req, res, next) => {
  try {
    const {
      recipientAddress,
      tokenAddress,
      tokenAmount,
      tokenDecimals = 6,
      chainId = 1,
    } = req.body;
    
    // Validate required fields
    if (!recipientAddress || !tokenAddress || !tokenAmount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: recipientAddress, tokenAddress, tokenAmount',
      });
    }
    
    const { signer, avalancheClient } = createEvmClients();
    const silentswap = createSilentSwapClientInstance();
    
    const result = await silentSwapService.executeSilentSwap({
      silentswap,
      signer,
      client: avalancheClient,
      recipientAddress,
      tokenAddress,
      tokenAmount,
      tokenDecimals,
      chainId,
    });
    
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/swap/quote
 * Get quote for silent swap
 */
router.post('/quote', async (req, res, next) => {
  try {
    const {
      recipientAddress,
      tokenAddress,
      tokenAmount,
      tokenDecimals = 6,
      chainId = 1,
    } = req.body;
    
    // Validate required fields
    if (!recipientAddress || !tokenAddress || !tokenAmount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: recipientAddress, tokenAddress, tokenAmount',
      });
    }
    
    const { signer } = createEvmClients();
    const silentswap = createSilentSwapClientInstance();
    
    // Authenticate and create facilitator group
    const entropy = await silentSwapService.authenticateAndDeriveEntropy(silentswap, signer);
    const { group, depositCount } = await silentSwapService.createFacilitatorGroup(entropy, signer.address);
    
    // Get quote
    const quoteResponse = await silentSwapService.getSwapQuote({
      silentswap,
      signer,
      group,
      recipientAddress,
      tokenAddress,
      tokenAmount,
      tokenDecimals,
      chainId,
    });
    
    res.json({
      success: true,
      data: {
        quoteId: quoteResponse.quoteId,
        quote: quoteResponse.quote,
        depositCount,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
