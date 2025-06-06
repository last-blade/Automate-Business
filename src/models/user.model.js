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
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    accountType: {
        type: String,
        enum: ["Admin", "Manager", "Team Member", "Worker"],
        default: "Admin"
    },

    whatsappNumber: {
        type: Number,
        required: true,
        trim: true
    },

    location: {
        type: String,
        default: "NA",
    },
    
    bio: {
        type: String,
         default: "NA",
    },

    designation: {
        type: String,
         default: "NA",
    },

    department: {
        type: String,
         default: "NA",
    },

    complaintImage: {
        type: String,
    },

    // reportingManager: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },

    refreshToken: {
        type: String,
    }
}, {timestamps: true});

userSchema.methods.generateAccessToken = async function(){
    const accessToken = await jwt.sign(
        {
            fullname: this.fullname,
            email: this.email,
            id: this._id,
            accountType: this.accountType,
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    return accessToken;
};

userSchema.methods.generateRefreshToken = async function(){
    const refreshToken = await jwt.sign({id: this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
    return refreshToken;
}

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