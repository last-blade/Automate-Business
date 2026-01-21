import mongoose from "mongoose";
import {
  Activity,
  apiError,
  apiResponse,
  asyncHandler,
  Task,
  User,
} from "../allImports.js";
import taskCreatedEmail from "../../emails/taskEmails/taskCreatedEmail.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const createTask = asyncHandler(async (request, response) => {
  let {
    taskTitle,
    taskDescription,
    taskAssignedTo,
    taskCategory,
    taskDueDate,
    taskPriority,
    taskFrequency,
    assigningToYourself,
  } = request.body;

  const isSelf =
    assigningToYourself === true ||
    assigningToYourself === "true" ||
    assigningToYourself === 1 ||
    assigningToYourself === "1";

  if (
    [taskTitle, taskDescription, taskCategory, taskDueDate, taskPriority].some(
      (field) => field === undefined || field.toString().trim() === ""
    )
  ) {
    throw new apiError(400, "All required fields must be non-empty strings");
  }

  // NEW: normalize assignees into an array ---
  const normalizeAssignees = (value) => {
    if (value === undefined || value === null) return [];
    if (Array.isArray(value)) return value;

    if (typeof value === "string") {
      const trimmed = value.trim();
      // handle JSON-stringified array: '["id1","id2"]'
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          const parsed = JSON.parse(trimmed);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          return [value];
        }
      }
      // single id string
      return [trimmed];
    }

    // fallback: wrap anything else
    return [value];
  };

  if (isSelf) {
    // assign only to yourself
    taskAssignedTo = [request.user.id];
  } else {
    taskAssignedTo = normalizeAssignees(taskAssignedTo);

    if (!taskAssignedTo.length) {
      throw new apiError(400, "taskAssignedTo is required");
    }

    // validate ObjectIds
    const invalidId = taskAssignedTo.find(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidId) {
      throw new apiError(
        400,
        "taskAssignedTo must contain valid MongoDB ObjectId(s)"
      );
    }

    // ensure all users exist
    const uniqueIds = [...new Set(taskAssignedTo.map((id) => id.toString()))];
    const assignedUsers = await User.find({ _id: { $in: uniqueIds } }).select(
      "_id"
    );

    if (assignedUsers.length !== uniqueIds.length) {
      throw new apiError(404, "One or more assigned users not found");
    }

    taskAssignedTo = uniqueIds;
  }

  // Upload image if provided
  let taskImage = null;
  const taskImageLocalFilePath = request.file?.path;

  if (taskImageLocalFilePath) {
    const taskImageUploaded = await uploadOnCloudinary(taskImageLocalFilePath);
    if (taskImageUploaded) {
      taskImage = {
        url: taskImageUploaded.secure_url,
        public_id: taskImageUploaded.public_id,
      };
    }
  }

  const taskData = {
    taskTitle,
    taskDescription,
    taskAssignedTo,
    taskCategory,
    taskDueDate,
    taskPriority,
    taskImage,
    taskCreatedBy: request.user?.id,
    assigningToYourself: isSelf,
  };

  // Include optional field "taskFrequency" if present
  if (taskFrequency) {
    taskData.taskFrequency = taskFrequency;
  }

  const newTask = await Task.create(taskData);

  const createdTask = await Task.findById(newTask._id)
    .populate("taskAssignedTo", "fullname email whatsappNumber")
    .populate("taskCreatedBy", "fullname email");

  if (!createdTask) {
    throw new apiError(500, "Something went wrong while assigning task");
  }

  // --- NEW: email + activity for each assignee ---
  const assignees = Array.isArray(createdTask.taskAssignedTo)
    ? createdTask.taskAssignedTo
    : [];

  await Promise.all(
    assignees.map((assignee) =>
      taskCreatedEmail({
        taskTitle,
        assigneeName: assignee.fullname,
        assigneeEmail: assignee.email,
        dueDate: taskDueDate,
        taskDescription,
        taskPriority,
        taskCategory,
        taskImage: createdTask.taskImage?.url,
        phone: assignee.whatsappNumber,
      })
    )
  );

  const activities = assignees.map((assignee) => ({
    messageType: "task_created",
    message: `${createdTask.taskCreatedBy.fullname} created task: ${createdTask.taskTitle}`,
    creatorName: createdTask.taskCreatedBy.fullname,
    user: assignee._id,
    task: createdTask._id,
  }));

  if (activities.length) {
    await Activity.create(activities);
  }

  return response
    .status(201)
    .json(new apiResponse(201, createdTask, "Task assigned successfully"));
});

export { createTask };
