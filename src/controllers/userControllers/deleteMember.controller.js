import accountDeletedEmail from "../../emails/userEmails/accountDeletedEmail.js";
import { apiError, apiResponse, asyncHandler, NewMember, Task, User } from "../allImports.js";

const deleteMember = asyncHandler(async (request, response) => {
    const {memberId} = request?.params;

    if(!memberId){
        throw new apiError(404, "Member id not found")
    }

    const foundMember = await NewMember.findOne({
        newMemberCreatedBy: request.user?.id,
        newMember: memberId,
    }).populate("newMember", "fullname email");

    if(!foundMember){
        throw new apiError(404, "Member not found, maybe deleted")
    }

    await NewMember.findOneAndDelete({
        newMemberCreatedBy: request.user?.id,
        newMember: memberId,
    });

    // await User.findByIdAndDelete(memberId);

    await Task.deleteMany({
        taskAssignedTo: memberId,
    });

    await accountDeletedEmail({
        fullname: foundMember.newMember.fullname,
        email: foundMember.newMember.email,
    });

    return response.status(200)
    .json(
        new apiResponse(200, {}, `Team member '${foundMember.newMember.fullname}' deleted successfully`)
    )

});

export {deleteMember}