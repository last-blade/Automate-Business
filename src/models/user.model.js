import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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

userSchema.methods.generateAccessToken = async function(){
    const accessToken = await jwt.sign(
        {
            fullname: this.fullname,
            email: this.email,
            id: this._id
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    return accessToken;
};

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

export const User = mongoose.model("User", userSchema);