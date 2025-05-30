import passwordChangeEmail from "../../emails/userEmails/passwordChangeEmail.js";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const changePassword = asyncHandler(async (request, response) => {
    const {email, incomingPassword} = request.body;

    if([email, incomingPassword].some(inputField => inputField === undefined || inputField.toString().trim() === "")){
        throw new apiError(404, "All fields are required")
    }

    const foundUser = await User.findOne({email: email});

    if(!foundUser){
        throw new apiError(404, "User with this email does not exists")
    }

    foundUser.password = incomingPassword;
    
    foundUser.save({validateBeforeSave: false});

    // Sending confirmation email
    await passwordChangeEmail({ email, fullname: foundUser.fullname });

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Password changed successfully")
    )

});

export {changePassword}