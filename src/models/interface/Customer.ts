import { Document } from "mongoose";

/**
 * @description
 * balance: Balance as of Last Night EOD
 */
export interface ICustomer extends Document{
    name: string,
    photo:string, 
    preferences:[string],
    userid : string,
    balance: Number,
    accountEmail : string
}
