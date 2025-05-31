import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    taskTitle: {
        type: String,
        required: true,
    },

    taskDescription: {
        type: String,
        required: true,
    },

    taskAssignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    taskCategory: {
        type: String,
        required: true,
    },

    taskDueDate: {
        type: Date,
        // required: true,
        default: Date.now,
    },

    taskPriority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Low",
        // required: true,
    },

    taskFrequency: {
        type: {
            type: String,
            enum: ["one-time", "daily", "weekly", "monthly", "yearly", "periodically"],
        },
        details: {
            daysOfWeek: [
                {
                    day: {
                        type: String,
                        enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        required: true,
                    },
                    date: {
                        type: Date,
                        required: true,
                    }
                }
            ],

            datesOfMonth: [
                {
                    type: Number,
                    min: 1,
                    max: 31
                }
            ],

            yearlyDate: Date,

            periodicDates: [Date]
        }
    },

    taskStatus: {
        type: String,
        enum: ["Overdue", "Pending", "In Progress", "Completed"],
        default: "Pending",
    },

    taskImage: {
        type: String
    },

    taskCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },


}, {timestamps: true});

export const Task = mongoose.model("Task", taskSchema);