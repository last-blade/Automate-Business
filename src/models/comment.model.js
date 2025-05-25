import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    comment: {
        type: String,
    },

    commentedTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },

    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    thisTaskAssignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    }

}, {timestamps: true});

export const Comment = mongoose.model("Comment", commentSchema);