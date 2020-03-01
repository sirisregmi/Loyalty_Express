import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { STATUS_CODE, STATUS_DESC } from '../utils/Status'
import MerchantOffer from '../models/offerModel';
import { STATUS_CODES } from "http";

class MerchantController {
    constructor() {
    }

    public saveOffer = catchAsync(async (req: Request, res: Response) => {

        console.log(req.body.data);
        const offer = await MerchantOffer.create({
            name:req.body.name,
            fromDate: req.body.fromDate,
            desc : req.body.desc,
            terms:req.body.terms,
            image:req.body.image,
            merchant:req.body.merchant
        });

        const data = await offer.save();

        

        res.status(STATUS_CODE.SAVE_SUCCESSFULLY).json({
            status: STATUS_DESC.SUCCESS,
            data
        })

    })

    public getAllOffers = catchAsync(async (req: Request, res: Response) => {

        const data = await MerchantOffer.find()
        res.status(200).json({
            status: STATUS_DESC.SUCCESS,
            data
        });
    });
}
const merchantController = new MerchantController();

export default merchantController;
