import { Document } from "mongoose";

export interface UserEntity extends Document { 
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    refreshToken: string;
}