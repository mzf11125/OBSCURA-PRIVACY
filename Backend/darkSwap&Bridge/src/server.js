import express from 'express';
import cors from 'cors';
import { config, validateConfig } from './config/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { authenticateApiKey } from './middleware/auth.js';
import healthRoutes from './routes/health.js';
import bridgeRoutes from './routes/bridge.js';
import swapRoutes from './routes/swap.js';

// Validate configuration
try {
  validateConfig();
} catch (error) {
  console.error('Configuration validation failed:', error.message);
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/bridge', authenticateApiKey, bridgeRoutes);
app.use('/api/swap', authenticateApiKey, swapRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'darkSwap & Bridge Backend',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      bridge: {
        quote: 'POST /api/bridge/quote',
        execute: 'POST /api/bridge/execute',
        status: 'GET /api/bridge/status/:requestId',
        solveUsdc: 'POST /api/bridge/solve-usdc',
        pollStatus: 'POST /api/bridge/poll-status',
      },
      swap: {
        execute: 'POST /api/swap/execute',
        quote: 'POST /api/swap/quote',
      },
    },
  });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`\n🚀 darkSwap & Bridge Backend running on port ${PORT}`);
  console.log(`📍 Environment: ${config.nodeEnv}`);
  console.log(`🔗 SilentSwap API: ${config.silentswap.apiUrl}`);
  console.log(`\n📚 API Documentation:`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Bridge: http://localhost:${PORT}/api/bridge/*`);
  console.log(`   Swap:   http://localhost:${PORT}/api/swap/*`);
  console.log(`\n✨ Ready to process transactions!\n`);
});
