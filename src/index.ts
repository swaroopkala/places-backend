import { createApp } from './app';
import { env, validateEnv } from './config/env';

try {
  validateEnv();
} catch (error) {
  console.error(`Environment validation failed: ${(error as Error).message}`);
  console.error('Please check your .env file and make sure all required variables are set.');
  process.exit(1);
}

const app = createApp();

const server = app.listen(env.port, () => {
  console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
  console.log(`Health check available at http://localhost:${env.port}/health`);
  console.log(`Places autocomplete available at http://localhost:${env.port}/places/autocomplete?query=your_search_query`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});
