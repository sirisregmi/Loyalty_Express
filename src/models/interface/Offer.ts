import { Document } from "mongoose";
import { IMerchant } from "./Merchant";

export interface IOffer extends Document{
    name:string,
    fromDate: Date,
    toDate:Date,
    desc : String,
    terms:String,
    image:string,
    active:Boolean,
    merchant:IMerchant['_id'];
}