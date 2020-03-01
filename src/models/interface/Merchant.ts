import { Document } from "mongoose";

export interface IMerchant extends Document{
    /**
     * Name : Merchant name
     * Trading Name : Trading Name of Merchant if Different 
     * merchantLevel : Size of Merchant 
     * location : Location of the merchant, if there are any many outlets , 
     * all can be stored as Array
     * priceDev : How high or low in scale of 1-5 , 5 being most expensive
     */
    name:string,
    tradingName: string,
    merchantCode: string,
    images: [String],
    imageCover:string,
    ratingsAverage: number,
    priceDev: number,
    location:Object,
    merchantLevel:string,
    accountNumber : string,
    balance:number
}