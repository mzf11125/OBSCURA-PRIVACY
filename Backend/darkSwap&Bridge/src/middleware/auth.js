import { config } from '../config/index.js';

/**
 * API Key authentication middleware
 */
export function authenticateApiKey(req, res, next) {
  // Skip auth if no API key is configured
  if (!config.security.apiKey) {
    return next();
  }
  
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== config.security.apiKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing API key',
    });
  }
  
  next();
}

/**
 * Request validation middleware
 */
export function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: `Validation error: ${error.details[0].message}`,
      });
    }
    
    next();
  };
}
