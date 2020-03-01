import crypto from 'crypto';
import { promisify } from 'util';
import { config as configDotenv } from 'dotenv'

import User from './../models/userModel';
import catchAsync from './../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import AppError from './../utils/appError';
import jwt from 'jsonwebtoken';

import { TokenData, DataStoredInToken } from '../models/interface/models';
import { IUser } from '../models/interface/User';
//import { strict } from 'assert';

class AuthenticationController {
  signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  }

  createSendToken = (user: IUser, statusCode: number, res: Response) => {
    const token = this.signToken(user._id);
    const cookieOptions = {
      expires: new Date(),
      httpOnly: true,
      secure: false
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    user.password = '';
    res
      .status(statusCode)
      .json({
        status: 'success',
        token,
        data: {
          user
        }
      });
  }

  public signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });
    /****
     * Connect to a queue to Create a Customer
     * Drop the user to the Queue and after 
     * activation the user account to be created
     */
    this.createSendToken(newUser, 201, res);
  });

  public login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
      }
      const user = await User.findOne({ email }).select('+password');

      if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
      }
      this.createSendToken(user, 200, res);
    }
    catch (err) {
      res.status(200).json({ 'message': err });

    }
  });

  public protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET) as IUser;

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    // 4) Check if user changed password after the token was issued
    /* if (currentUser.changedPasswordAfter(decoded.iat)) {
       return next(
         new AppError('User recently changed password! Please log in again.', 401)
       );
     }
   */
    // GRANT ACCESS TO PROTECTED ROUTE
    //req.use = currentUser;
    next();
  });
}
const authController = new AuthenticationController();

export default authController;
