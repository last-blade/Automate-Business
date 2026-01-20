import mongoose, { Schema } from "mongoose";

const meetingNoteSchema = new Schema({
    meetingTitle: {
        type: String,
        trim: true,
        required: true,
    },

    meetingDate: {
        type: Date,
        required: true,
    },

    department: {
        type: String,
        default: null,
    },

    meetingMode: {
        type: String,
        enum: ["Online", "Offline"],
        default: "Offline",
    },

    meetingMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        }
    ],

    meetingDescription: {
        type: String,
        required: true,
    },

    meetingNoteCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, {timestamps: true});

meetingNoteSchema.index({meetingDate: 1});
meetingNoteSchema.index({meetingMode: 1});
meetingNoteSchema.index({meetingNoteCreatedBy: 1});

export const MeetingNote = mongoose.model("MeetingNote", meetingNoteSchema);