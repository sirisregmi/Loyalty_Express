import mongoose from 'mongoose';
import { ICustomer } from './interface/Customer';


const customerSchema = new mongoose.Schema(
    {
        name: String,
        birthDate: Date,
        gender: {
            type: String,
            enum: ['M', 'F'],
            required: true
        },
        email: { type: String, required: true, unique: true },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

customerSchema.virtual('accounts',
    {
        ref: 'Account',
        localField: 'accountEmail',
        foreignField: 'email'
    });


const Customer = mongoose.model<ICustomer & mongoose.Document>('Customer', customerSchema)

export default Customer;