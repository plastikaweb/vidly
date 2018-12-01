import express = require('express');
import { Request, Response, Router } from 'express';
import { IRouterBySection } from '../models/';

export class HomeRoutes implements IRouterBySection {
  public getRoutes(): Router {
    const router = express.Router();
    return router.get('/', (req: Request, res: Response) => {
      res.send('This is home');
    });
  }
}
