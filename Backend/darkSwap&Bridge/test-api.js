/**
 * Test script for darkSwap & Bridge API
 * Run with: node test-api.js
 */

const BASE_URL = 'http://localhost:3000';

async function testHealthCheck() {
  console.log('\n🔍 Testing Health Check...');
  try {
    const response = await fetch(`${BASE_URL}/api/health`);
    const data = await response.json();
    console.log('✅ Health Check:', data);
    return true;
  } catch (error) {
    console.error('❌ Health Check failed:', error.message);
    return false;
  }
}

async function testBridgeQuote() {
  console.log('\n🔍 Testing Bridge Quote...');
  try {
    const response = await fetch(`${BASE_URL}/api/bridge/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        srcChainId: 1,
        srcToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC on Ethereum
        srcAmount: '1000000', // 1 USDC
        dstChainId: 43114,
        dstToken: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', // USDC on Avalanche
        userAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      }),
    });
    const data = await response.json();
    console.log('✅ Bridge Quote:', JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Bridge Quote failed:', error.message);
    return false;
  }
}

async function testSwapQuote() {
  console.log('\n🔍 Testing Swap Quote...');
  try {
    const response = await fetch(`${BASE_URL}/api/swap/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipientAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
        tokenAmount: '10',
        tokenDecimals: 6,
        chainId: 1,
      }),
    });
    const data = await response.json();
    console.log('✅ Swap Quote:', JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Swap Quote failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting API Tests...');
  console.log(`📍 Base URL: ${BASE_URL}`);
  
  const results = {
    healthCheck: await testHealthCheck(),
    bridgeQuote: await testBridgeQuote(),
    swapQuote: await testSwapQuote(),
  };
  
  console.log('\n📊 Test Results:');
  console.log('─────────────────────────────');
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}`);
  });
  
  const allPassed = Object.values(results).every(r => r);
  console.log('─────────────────────────────');
  console.log(allPassed ? '✅ All tests passed!' : '❌ Some tests failed');
}

runTests();
