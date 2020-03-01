import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { STATUS_CODE, STATUS_DESC } from '../utils/Status'
import Customer from '../models/customerModel';
import { STATUS_CODES } from "http";

class CustomerController {
    constructor() {
    }

    public createOne = catchAsync(async (req: Request, res: Response) => {

        const newCustomer = await Customer.create({
            name: req.body.name,
            birthDate:req.body.birthDate,
            gender:req.body.gender,
            accountEmail: req.body.email
        });
        const doc = await newCustomer.save();
//        newMerchant.save()
        res.status(STATUS_CODE.SAVE_SUCCESSFULLY).json({
            status: STATUS_DESC.SUCCESS,
            data: newCustomer
        })
    })

    public getAll = catchAsync(async (req: Request, res: Response) => {
        const data = await Customer.find()
        res.status(200).json({
            status: STATUS_DESC.SUCCESS,
            data
        });
    });

    public getOne = catchAsync(async(req:Request, res:Response)=>{
        const data = await (await Customer.findById(req.params.id).populate('accounts'));
        res.status(200).json({
            status: STATUS_DESC.SUCCESS,
            data
        });
    })
}
const customerController = new CustomerController();

export default customerController;
