import { Router } from 'express';

export interface IRouterBySection {
  getRoutes(): Router;
}
