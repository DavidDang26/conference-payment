import * as express from 'express';

export interface IController {
  readonly router: express.Router;
  readonly path: string;

  initializeRouters(): void;
}
