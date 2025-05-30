import myAccountDeletedEmail from "../../emails/userEmails/myAccountDeletedEmail.js";
import { apiError, apiResponse, asyncHandler, Task, User } from "../allImports.js";

const deleteMyAccount = asyncHandler(async (request, response) => {
    const userId = request.user?.id;

    const foundUser = await User.findById(userId);

    if(!foundUser){
        throw new apiError(404, "User not found, login again")
    }

    await User.findByIdAndDelete(userId);
    
    const foundUserAgain = await User.findById(userId);
    
    if(!foundUserAgain){

        await Task.deleteMany({
            taskCreatedBy: userId
        })

        myAccountDeletedEmail({ fullname: foundUser.fullname, email: foundUser.email })

        return response.status(200)
        .json(
            new apiResponse(200, {}, "Account deleted successfully")
        )
    }

    else{
        throw new apiError(500, "Something went wrong while deleting your account")
    }

});

export {deleteMyAccount}