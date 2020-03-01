import { Router, Request, Response, NextFunction } from 'express';
import accountController from '../controllers/accountController';

export class AccountRouter {
    router: Router
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
      * Take each handler, and attach to one of the Express.Router's
      * endpoints.
      */

    init() {
        this.router
            .route('/')
            .get(accountController.getAll)
            .post(accountController.createOne);
        this.router
            .route('/:id')
            .get(accountController.getOne)
    }
}

const accountRoutes = new AccountRouter();
accountRoutes.init();

export default accountRoutes.router;