import { Router, Request, Response, NextFunction } from 'express';
import customerController from '../controllers/customerController';

export class CustomerRouter {
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
            .get(customerController.getAll)
            .post(customerController.createOne);
        this.router
            .route('/:id')
            .get(customerController.getOne)
    }
}

const customerRoutes = new CustomerRouter();
customerRoutes.init();

export default customerRoutes.router;