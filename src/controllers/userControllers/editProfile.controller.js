import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const editProfile = asyncHandler(async (request, response) => {
    
    const userId = request.user?.id;

    const {fullname, whatsappNumber, location, bio, designation, department} = request.body;

    if(!fullname){
        throw new apiError(404, "Fullname is required")
    }

    if(!whatsappNumber){
        throw new apiError(404, "WhatsApp number is required")
    }

    await User.findByIdAndUpdate(userId, {
        $set: {
            fullname, 
            whatsappNumber, 
            location, 
            bio, 
            designation, 
            department,
        }
    });

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Profile updated successfully")
    )

});

export {editProfile}