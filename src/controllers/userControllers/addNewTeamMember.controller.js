import { sendExistedMemberWelcomeEmail } from "../../emails/userEmails/sendExistedMemberWelcomeEmail.js";
import sendWelcomeEmail from "../../emails/userEmails/sendWelcomeEmail.js";
import { apiError, apiResponse, asyncHandler, NewMember, User } from "../allImports.js";

const addNewTeamMember = asyncHandler(async (request, response) => {
    const {fullname, email, whatsappNumber, department, accountType, password} = request.body;

    if([fullname, email, whatsappNumber, department, accountType, password].some(inputField => inputField === undefined || inputField.toString().trim() === "")){
        throw new apiError(404, "All fields are required")
    }

    const foundUser = await User.findOne({email: email});

    if(foundUser){
        // throw new apiError(400, "User with this email or whatsapp number already exists")
        if(foundUser._id.toString() === request.user.id){
            throw new apiError(400, "You cannot add yourself in team")
        }
        const foundTeamMeberInLoggedInUsers = await NewMember.find({
            newMemberCreatedBy: request.user?.id,
            newMember: foundUser._id,
        });

        if(foundTeamMeberInLoggedInUsers.length > 0){
            throw new apiError(400, "User already exists in your team")
        }

        const newTeamMember = await NewMember.create({
            newMemberCreatedBy: request.user?.id,
            newMember: foundUser._id,
        });

        const foundNewMember = await NewMember.findById(newTeamMember._id).populate("newMemberCreatedBy", "fullname");

        if(!foundNewMember){
            throw new apiError(500, "Something went wrong, while adding a new member")
        }
        await sendExistedMemberWelcomeEmail({ fullname, email, createdBy: foundNewMember.newMemberCreatedBy.fullname});

        return response.status(201)
        .json(
            new apiResponse(201, foundUser, "New team member added successfully")
        )
    }

    const createdUser = await User.create({
        fullname, 
        email, 
        whatsappNumber, 
        accountType, 
        department,
        // reportingManager, 
        password,
    });

    const isUserCreated = await User.findById(createdUser._id).select("-password -__v");

    if(!isUserCreated){
        throw new apiError(500, "Something went wrong, while adding a new member")
    }

    const newTeamMember = await NewMember.create({
        newMemberCreatedBy: request.user?.id,
        newMember: isUserCreated._id,
    });

    const foundNewMember = await NewMember.findById(newTeamMember._id).populate("newMemberCreatedBy", "fullname");

    if(!foundNewMember){
        throw new apiError(500, "Something went wrong, while adding a new member")
    }

    // Sending Welcome Email
    await sendWelcomeEmail({ fullname, email, password, createdBy: foundNewMember.newMemberCreatedBy.fullname});

    return response.status(201)
    .json(
        new apiResponse(201, isUserCreated, "New team member added successfully")
    )

});

export {addNewTeamMember}