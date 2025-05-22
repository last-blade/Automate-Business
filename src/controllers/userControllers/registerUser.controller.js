import { apiError, asyncHandler, User } from "../allImports.js";

const registerUser = asyncHandler(async (request, response) => {
    const {email, fullname, password, confirmPassword} = request.body;

    if([email, fullname, password, confirmPassword].some((inputField) => inputField.trim === "")){
        throw new apiError("All fields are required", 404);
    }

    if(password !== confirmPassword){
        throw new apiError("Passwords don't match", 400);
    }

    const foundUser = await User.findOne({email: email});

    if(foundUser){
        throw new apiError("User with this email already exists", 400)
    }

    const newUser = await User.create({
        email,
        fullname,
        password,
    });

    const newUserFound = await User.findById(newUser._id).select("-password -refreshToken");

    if(!newUserFound){
        throw new apiError("Something went wrong while registration", 500)
    }

    return response.status(201)
    .json(201, newUserFound, "User registered successfully")

});

export {registerUser}