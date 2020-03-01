import mongoose from 'mongoose';
import { IMerchant } from './interface/Merchant';
import { MERCHANT_LEVEL } from './utilityModel';


const merchantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tradingName: {
        type: String,
        required: true
    },
    merchantCode: {
        type: String,
        required: true,
        enum: ['7011', '4265']
    },

    accountNumber: {
        type: Number,
        required: true,
        default: 0
    },
    accountBalance:{
        type:Number,
        required:true,
        default:0
    },
    images: [String],
    imageCover: {
        type: String
    },
    ratingsAverage: {
        type: Number
    },
    priceReference: {
        type: Number
    },
    merchantSize: {
        type: MERCHANT_LEVEL,
        required: true
    },
    location: [{
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
    }]

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

//Virtual Populate

merchantSchema.virtual('offers',
    {
        ref: 'Offer',
        localField: '_id',
        foreignField: 'merchant'
    });



export default mongoose.model<IMerchant & mongoose.Document>('Merchant', merchantSchema);

