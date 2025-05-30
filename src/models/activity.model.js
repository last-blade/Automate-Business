import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema({
    messageType: {
        type: String,
        enum: ["task_created", "comment_added", "team_member_added"],
        required: true
    },

    message: {
        type:  String,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },

}, {timestamps: true});

export const Activity = mongoose.model("Activity", activitySchema);