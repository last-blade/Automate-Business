import mongoose, { Schema } from "mongoose";

const supportSchema = new Schema({
    subject: {
        type: String,
        required: true,
        trim: true,
    },

    category: {
        type: String,
        required: true,
        trim: true,
    },

    priority: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    attachFile: {
        url: {
            type: String,
            required: false
        },
        public_id: {
            type: String,
            required: false
        }
    },

    ticketStatus: {
        type: String,
        enum: ["In Progress", "Resolved"],
        default: "In Progress",
        trim: true,
        required: true,
    },

    ticketId: {
        type: String,
        trim: true,
    },

    ticketCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, {timestamps: true});


supportSchema.pre("save", async function(next){

    if (!this.ticketId) {
        this.ticketId = "#TKT" + this._id;
    }
    next();
});

export const Support = mongoose.model("Support", supportSchema);