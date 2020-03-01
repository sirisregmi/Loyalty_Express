import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { STATUS_CODE, STATUS_DESC } from '../utils/Status'
import Merchant from '../models/merchantModel';
import { STATUS_CODES } from "http";

class MerchantController {
    constructor() {
    }

    public createOne = catchAsync(async (req: Request, res: Response) => {

        const newMerchant = await Merchant.create({
            name: req.body.name,
            tradingName: req.body.tradingName,
            merchantCode: req.body.merchantCode,
            accountNumber : req.body.accountNumber,
            merchantSize: req.body.size,
            images: 'image.txt',
            imageCover: 'cover.jpg',
            location: req.body.location
        });
        const doc = await newMerchant.save();
//        newMerchant.save()
        res.status(STATUS_CODE.SAVE_SUCCESSFULLY).json({
            status: STATUS_DESC.SUCCESS,
            data: newMerchant
        })
    })

    public getAll = catchAsync(async (req: Request, res: Response) => {
        const data = await Merchant.find()
        res.status(200).json({
            status: STATUS_DESC.SUCCESS,
            data
        });
    });

    public getOne = catchAsync(async(req:Request, res:Response)=>{
        const data = await (await (await Merchant.findById(req.params.id).populate('offers')).populate('Account'));
        res.status(200).json({
            status: STATUS_DESC.SUCCESS,
            data
        });
    })
}
const merchantController = new MerchantController();

export default merchantController;
