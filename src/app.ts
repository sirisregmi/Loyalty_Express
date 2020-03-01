import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';
import merchantRouter from './routes/merchantRoutes';
import offerRoutes from './routes/offerRoutes';
import accountRoutes from './routes/accountRoutes';
import customerRoutes from './routes/customerRoutes'
var app: Application = express();
class App {
  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();

    router.use('/api/v1/users', userRouter);
    router.use('/api/v1/merchants', merchantRouter);
    router.use('/api/v1/offers', offerRoutes);
    router.use('/api/v1/account', accountRoutes);
    router.use('/api/v1/customer', customerRoutes);
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
  }

}

export default new App().express;