import { Document } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    passwordChangedAt: number,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: Boolean,
    

    correctPassword(candidatePassword: string, userPassword: string): boolean;
    changedPasswordAfter(JWTTime: number): boolean;
    createPasswordResetToken(): string;
}