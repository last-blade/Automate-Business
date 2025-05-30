import userRegistrationEmail from "../../emails/userEmails/userRegistrationEmail.js";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const registerUser = asyncHandler(async (request, response) => {
    let {email, fullname, whatsappNumber, password, confirmPassword} = request.body;

    whatsappNumber = parseInt(whatsappNumber);

    if ([email, fullname, whatsappNumber, password, confirmPassword].some(inputField =>inputField === undefined || inputField.toString().trim() === "")) {
        throw new apiError(404, "All fields are required");
    }


    if(password !== confirmPassword){
        throw new apiError(400, "Passwords don't match");
    }

    const foundUser = await User.findOne({email: email});

    if(foundUser){
        throw new apiError(400, "User with this email already exists")
    }

    const newUser = await User.create({
        email,
        fullname,
        whatsappNumber,
        password,
    });

    const newUserFound = await User.findById(newUser._id).select("-password -_id -__v");

    if(!newUserFound){
        throw new apiError(500, "Something went wrong while registration")
    }

    // Sending welcome email to the user
    await userRegistrationEmail({ email, fullname });

    return response.status(201)
    .json(
        new apiResponse(201, newUserFound, "User registered successfully")
    )

});

export {registerUser}