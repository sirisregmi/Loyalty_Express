import { Router, Request, Response, NextFunction } from 'express';
import merhantOfferController from '../controllers/offerController';

export class OfferRouter {
    router: Router
    /**
     * Initialize the MerchantOfferRouter
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
            .get(merhantOfferController.getAllOffers)
            .post(merhantOfferController.saveOffer);
    }
}

const offerRoutes = new OfferRouter();
offerRoutes.init();

export default offerRoutes.router;