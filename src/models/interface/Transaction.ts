import { Document } from "mongoose";

export interface ITransaction extends Document{
    /**
     * @description
     * transactionDate : Date of transaction , current time stamp
     * transactionStatus : Taken from ENUM TRAN_STATUS
     * accountingType : DRCR TYPE enum
     * 
     */
    fromAccount : string,
    toAccout :string,
    amount :number,
    transactionDate :Date,
    transactionStatus :number,
    accountingType:number,
}
