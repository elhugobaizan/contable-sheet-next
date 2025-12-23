// Jest environment setup - runs BEFORE any imports
// This file sets up environment variables needed for tests

process.env.DATABASE_URL = process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/test-db';
process.env.MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/test-db';

