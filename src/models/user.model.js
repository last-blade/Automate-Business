import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});





export const User = mongoose.model("User", userSchema);