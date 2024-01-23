import express, { NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import { IController } from './interfaces';

class App {
  public app: express.Application;
  public port: number | string;

  constructor(controllers: IController[], port: number | string) {
    this.app = express();
    this.port = port;

    this.initializeCors();
    this.initializeMiddleWares();
    this.initializeControllers(controllers);
  }

  private initializeCors() {
    this.app.use(
      cors({
        origin: '*'
      })
    );
  }

  private initializeMiddleWares() {
    this.app.use(bodyParser.json());
    this.app.use(express.json());
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running at port ${this.port}`);
    });
  }
}

export default App;
