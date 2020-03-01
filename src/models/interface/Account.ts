import { Document } from "mongoose";
import { TestAccount } from "nodemailer";

export interface IAccount extends Document {
    /**
     * @Account 
     */
    accountName: string,
    accountNumber: string,
    accountType: number,
    status: string,
    balance: number
}
