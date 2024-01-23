import express, { NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import { IController } from './shared/interface';
import { infoLog } from './shared/logger';

class App {
  public app: express.Application;
  public port: number | string;

  constructor(controllers: IController[], port: number | string) {
    this.app = express();
    this.port = port;

    this.initializeCors();
    this.initializeMiddleWares();
    this.initializeControllers(controllers);
    this.initializeStaticFiles();
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
    this.app.use(
      (req: express.Request, res: express.Response, next: NextFunction) => {
        infoLog(req, 'Input payload');
        next();
      }
    );
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeStaticFiles() {
    this.app.get('/main/', (req, res) => {
      res.send(`<!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta
            name="zalo-platform-site-verification"
            content="${process.env.ZALO_META_TAG_CONTENT}"
          />
        </head>
        <body></body>
      </html>
      `);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running at port ${this.port}`);
    });
  }
}

export default App;
