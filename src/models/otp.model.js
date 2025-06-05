import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
    otp: [
        {
            type: Number,
            required: true,
        },
    ],

    email: {
        type: String,
        required: true,
        unique: true, 
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60,
    },
    
}, { timestamps: true });

export const OTP = mongoose.model("OTP", otpSchema);
