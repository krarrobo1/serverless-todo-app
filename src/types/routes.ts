import { Express } from 'express';

export interface Routes {
  RegisterRoutes(app: Express): void;
}