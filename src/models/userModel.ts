import { IUser } from './interface/User';
import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';
import { NextFunction } from 'express';
import { strict } from 'assert';
import { isBuffer } from 'util';
import { Timestamp } from 'mongodb';
import crypto from 'crypto';
import validator from 'validator';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre<IUser>('save', async function (next: NextFunction) {
   
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete passwordConfirm field
    this.passwordConfirm = '';
    next();
});


userSchema.pre<IUser>('save',  function (next: NextFunction) {
    if (!this.isModified('password') || this.isNew) return next();
    console.log('Save Called-- PASSWORD2');
    this.passwordChangedAt = Date.now();
    next();
});


userSchema.pre<IUser>(/^find/,   function (next: NextFunction) {
    // this points to the current query
    console.log('Save Called- active');
    userSchema.statics.find({ active: { $ne: false } });
    next();
});


userSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp:number) {
    if (this.passwordChangedAt) {
      const changedTimestamp:number = 
      parseInt((this
        .passwordChangedAt.getTime() / 1000,10)
        .toString());
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    console.log({ resetToken }, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

userSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.statics.findMyCompany = async function(id:string) {
    return this.findById(id).populate("company").exec()
  }


userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken }, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  };
  
export default mongoose.model<IUser & mongoose.Document>('User', userSchema);

