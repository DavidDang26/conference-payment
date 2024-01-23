import { IController } from '../interfaces';
import { Request, Response, Router } from 'express';

class TestController implements IController {
  readonly path = '/api/test';
  readonly router = Router();

  constructor() {
    this.initializeRouters();
  }

  initializeRouters(): void {
    this.router.get(this.path, this.getTest);
  }

  getTest = async (req: Request, res: Response) => res.send('Hello World!');
}

export default TestController;
