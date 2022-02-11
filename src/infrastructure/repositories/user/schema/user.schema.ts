import { Schema } from "mongoose";

export const userSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true },
    firstName: {type: String, required: true },
    lastName: {type: String, required: true },
    mobileNumber: {type: String, required: true },
    refreshToken: {type: String, nullable: true }
});
