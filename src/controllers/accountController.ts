import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { STATUS_CODE, STATUS_DESC } from '../utils/Status'
import Account from '../models/accountModel';
import { STATUS_CODES } from "http";
import accounts from "../models/accountModel";

/***
 * Financial Accounts Related Controller
 * 
 * 
 */
class AccountController {
    constructor() {
    }

    public createOne = catchAsync(async (req: Request, res: Response) => {

        const newAccount = await Account.create({

            accountName: req.body.accountName,
            accountNumber: req.body.accountNumber,
            email: req.body.email
        });
        const doc = await newAccount.save();
        //        newMerchant.save()
        res.status(STATUS_CODE.SAVE_SUCCESSFULLY).json({
            status: STATUS_DESC.SUCCESS,
            data: newAccount
        })
    })

    public getAll = catchAsync(async (req: Request, res: Response) => {
        const data = await Account.find()
        res.status(200).json({
            status: STATUS_DESC.SUCCESS,
            data
        });
    });

    public getOne = catchAsync(async (req: Request, res: Response) => {
        const data = await (await Account.findById(req.params.id));
        res.status(200).json({
            status: STATUS_DESC.SUCCESS,
            data
        });
    })
}


const accountController = new AccountController();

export default accountController;