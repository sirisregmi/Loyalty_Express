import { Document } from "mongoose"



export interface TokenData {
    token: string;
    expiresIn: number;
  }

export interface DataStoredInToken {
    _id: string;
  }

