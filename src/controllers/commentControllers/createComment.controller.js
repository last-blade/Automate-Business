import commentNotificationEmail from "../../emails/taskEmails/commentNotificationEmail.js";
import { Activity, apiError, apiResponse, asyncHandler, Comment, Task } from "../allImports.js";

const createComment = asyncHandler(async (request, response) => {
    const {taskId} = request?.params;

    const {comment} = request.body;

    if(!taskId){
        throw new apiError(404, "Task id not found!")
    }

    if(comment === undefined || comment.trim() === ""){
        throw new apiError(404, "Comment is required")
    }

    const foundTask = await Task.findById(taskId).populate("taskAssignedTo", "_id fullname email whatsappNumber").populate("taskCreatedBy", "fullname email whatsappNumber");

    if(!foundTask){
        return response.status(404)
        .json(
            new apiResponse(404, {}, "Task not found, task may be deleted")
        )
    }

    const createdComment = await Comment.create({
        comment,
        commentedTask: taskId,
        commentedBy: request.user?.id,
        thisTaskAssignedTo: foundTask.taskAssignedTo,
    });

    const foundComment = await Comment.findById(createdComment._id).select("-__v -_id");

    if(!foundComment){
        throw new apiError(500, "Something went wrong while commenting!")
    }

    await Activity.create({
        messageType: "comment_added",
        message: `${request.user?.fullname} commented on: ${foundTask.taskTitle}: ${foundComment.comment}`,
        creatorName: request.user.fullname,
        user: foundTask.taskAssignedTo._id,
        task: foundTask._id,
    });

    //Kis user ko notify karna hai, deciding here.
    const commenterId = request.user.id;
    const assigner = foundTask.taskCreatedBy;
    const assignee = foundTask.taskAssignedTo;

    let receiver = null;
console.log("assigner", assigner);
console.log("assigned to", assignee);
    if (commenterId === assigner._id.toString()) {
        receiver = assignee;
        receiver.email = foundTask.taskAssignedTo.email;
        receiver.fullname = foundTask.taskAssignedTo.fullname;
        console.log("task creator", receiver.email)
    } else if (commenterId === assignee._id.toString()) {
        receiver = assigner;
        receiver.email = foundTask.taskCreatedBy.email;
        receiver.fullname = foundTask.taskCreatedBy.fullname;
        console.log("assigned-to", receiver.email)
    }

    if (receiver && receiver.email) {
        await commentNotificationEmail({
            recipientName: receiver.fullname || "User",
            recipientEmail: receiver.email,
            commenterName: request.user.fullname,
            taskTitle: foundTask.taskTitle,
            commentText: comment,
            phone: foundTask.taskAssignedTo?.whatsappNumber,
        });
    }

    return response.status(201)
    .json(
        new apiResponse(201, foundComment, "Comment successfully")
    )

});

export {createComment}