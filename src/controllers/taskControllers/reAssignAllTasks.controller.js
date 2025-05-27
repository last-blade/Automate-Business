import { apiError, apiResponse, asyncHandler, Task, User } from "../allImports.js";

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

    return response.status(200)
    .json(
        new apiResponse(200, {}, `All tasks assigned to ${foundNewTeamMemberToWhichTaskAssign.fullname}`)
    )    

});

export {reAssignAllTasks}