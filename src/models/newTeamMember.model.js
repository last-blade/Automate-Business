import mongoose, { Schema } from "mongoose";

const addNewTeamMemberSchema = new Schema({
    newMemberCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    newMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    
}, {timestamps: true});

export const NewMember = mongoose.model("NewMember", addNewTeamMemberSchema);