import taskReAssignedEmail from "../../emails/taskEmails/taskReAssignedEmail.js";
import taskRemovedFromUserEmail from "../../emails/taskEmails/taskRemovedFromUserEmail.js";
import { Activity, apiError, apiResponse, asyncHandler, Task, User } from "../allImports.js";

const reAssignAllTasks = asyncHandler(async (request, response) => {
    const {newTeamMemberToWhichTaskAssignId, confirmEmail} = request.body;

    if(!newTeamMemberToWhichTaskAssignId){
        throw new apiError(404, "Team member id is required")
    }

    if(!confirmEmail){
        throw new apiError(404, "Email is required")
    }

    const foundNewTeamMemberToWhichTaskAssign = await User.findById(newTeamMemberToWhichTaskAssignId);

    if(!foundNewTeamMemberToWhichTaskAssign){
        throw new apiError(404, "User does not exist")
    }

    const oldTeamMemberToWhichTaskRemove = await User.findOne({email: confirmEmail});

    const oldTeamMemberId = oldTeamMemberToWhichTaskRemove._id;

    const tasksToUpdate = await Task.find({ taskAssignedTo: oldTeamMemberId });

    if (tasksToUpdate.length === 0) {
        return response.status(200)
        .json(new apiResponse(200, {}, "No tasks to reassign from the provided email"));
    }

    await Task.updateMany(
        {
            taskAssignedTo: oldTeamMemberId
        },
        
        {
            $set: {
                taskAssignedTo: newTeamMemberToWhichTaskAssignId
            }
        }
    )

    // Sending reassignment email to new assignee
    await taskReAssignedEmail({
        newAssigneeName: foundNewTeamMemberToWhichTaskAssign.fullname,
        newAssigneeEmail: foundNewTeamMemberToWhichTaskAssign.email,
        oldUserEmail: confirmEmail,
        totalTasksReassigned: tasksToUpdate.length,
    });

    // Sending removal email to old assignee
    await taskRemovedFromUserEmail({
        oldUserName: oldTeamMemberToWhichTaskRemove.fullname,
        oldUserEmail: oldTeamMemberToWhichTaskRemove.email,
        newUserName: foundNewTeamMemberToWhichTaskAssign.fullname,
        totalTasksRemoved: tasksToUpdate.length,
    });

    await Activity.create({
        messageType: "tasks_re-assigned",
        message: `${request.user.fullname} re-assigned your all tasks to: ${foundNewTeamMemberToWhichTaskAssign.fullname}`,
        user: oldTeamMemberId,
        // task: {},
    });
    
    await Activity.create({
        messageType: "tasks_re-assigned",
        message: `${request.user.fullname} assigned all tasks of: ${oldTeamMemberToWhichTaskRemove.fullname} to you`,
        user: newTeamMemberToWhichTaskAssignId,
        // task: {},
    });

    return response.status(200)
    .json(
        new apiResponse(200, {}, `All tasks assigned to ${foundNewTeamMemberToWhichTaskAssign.fullname}`)
    )    

});

export {reAssignAllTasks}