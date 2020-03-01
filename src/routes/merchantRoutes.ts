import { Router, Request, Response, NextFunction } from 'express';
import merchantController from '../controllers/merchantController';

export class MerchantRouter {
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
            .get(merchantController.getAll)
            .post(merchantController.createOne);
        this.router
            .route('/:id')
            .get(merchantController.getOne)
    }
}

const merchantRoutes = new MerchantRouter();
merchantRoutes.init();

export default merchantRoutes.router;