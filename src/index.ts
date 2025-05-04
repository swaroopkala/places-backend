import { createApp } from './app';
import { env, validateEnv } from './config/env';

// Validate environment variables
try {
  validateEnv();
} catch (error) {
  console.error(`Environment validation failed: ${(error as Error).message}`);
  console.error('Please check your .env file and make sure all required variables are set.');
  process.exit(1);
}

// Create the Express app
const app = createApp();

// Start the server
const server = app.listen(env.port, () => {
  console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
  console.log(`Health check available at http://localhost:${env.port}/health`);
  console.log(`Places autocomplete available at http://localhost:${env.port}/places/autocomplete?query=your_search_query`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});
