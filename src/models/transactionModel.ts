import mongoose from 'mongoose';
import { ITransaction } from './interface/Transaction';
import { DRCR, TRAN_STATUS } from './utilityModel';

const tranSchema = new mongoose.Schema({

    fromAccount: {
        type: String,
        required: true
    },
    toAccout: {
        type: String, required: true
    },
    amount: {
        type: Number, required: true
    },

    transactionDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    transactionStatus: {
        type: TRAN_STATUS,
        required: true,
        default: TRAN_STATUS.ORIGINAL
    },
    accountingType: {
        type: DRCR,
        required: true

    }
});

const Transaction = mongoose.model<ITransaction & mongoose.Document>('Transaction', tranSchema);;

export default Transaction;
