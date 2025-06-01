import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },

    commentedTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },

    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    thisTaskAssignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    }

}, {timestamps: true});

export const Comment = mongoose.model("Comment", commentSchema);