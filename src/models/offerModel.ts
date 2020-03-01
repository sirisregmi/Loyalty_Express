import mongoose from 'mongoose';
import { IOffer } from './interface/Offer';

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: Date,
    desc: {
        type: String,
        required: true
    },
    terms: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
        required: [true, 'Review must belong to a user']
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const Offer = mongoose.model<IOffer & mongoose.Document>('Offer', offerSchema);;
export default Offer;
