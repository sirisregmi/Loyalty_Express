import mongoose from 'mongoose';
import { ACCOUNTTYPE } from './utilityModel'
import { IAccount } from './interface/Account';

/**
 * Account Schema that will attach with every document of customer or merchants 
 */

const accountSchema = new mongoose.Schema(
    {
        accountName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        status: { type: String, required: true, max: 1, default: 'O' },
        balance: { type: Number, required: true, default: 0 },
        email: {
            type: String,
            ref: 'Customer',
            required: [true, 'Each Account have a Primary Email']
        }
    },

    {
        toJSON: {
            virtuals: true,
        }
    });

const accounts = mongoose.model<IAccount & mongoose.Document>('Account', accountSchema);

export default accounts;
