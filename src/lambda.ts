import express, { ErrorRequestHandler } from 'express';
import serverless from 'serverless-http';
import { Routes } from './types/routes';
import fs from 'fs';
import path from 'path';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(express.json());

// Serve Swagger JSON
// const swaggerDocument = require('./swagger/swagger.json');
// app.get('/swagger.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerDocument);
// });

// // Serve Swagger HTML
// app.get('/swagger', (req, res) => {
//   res.sendFile(path.join(__dirname, 'swagger.html'));
// });

// Check if routes file exists
const routesPath = path.join(__dirname, 'routes', 'routes.js');
if (!fs.existsSync(routesPath)) {
  throw new Error('Routes file not found. Please run "npm run build" first.');
}

const { RegisterRoutes } = require('./routes/routes') as Routes;

RegisterRoutes(app);

// Error handling middleware
app.use(errorHandler as ErrorRequestHandler);

export const handler = serverless(app);