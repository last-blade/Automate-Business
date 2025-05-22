import { User, accessTokenOptions, apiError, apiResponse, asyncHandler, generateAccessToken, generateRefreshToken, refreshTokenOptions} from "../allImports.js"

const loginUser = asyncHandler(async (request, response) => {

    const {email, password} = request.body;

    if([email, password].some((inputField) => inputField.trim === "")){
        throw new apiError("All fields are required", 404)
    }

    const foundUser = await User.findOne({email: email})

    if(!foundUser){
        throw new apiError("User with this email does not exists")
    }

    const isValidPassword = await foundUser.isPasswordCorrect(password);

    if(!isValidPassword){
        throw new apiError("Incorrect password", 401)
    }

    const loggedInUser = await User.findOne({email: email}).select("-password")

    const accessToken = await generateAccessToken(loggedInUser._id);

    if(!accessToken){
        throw new apiError("Error in generating token", 400)
    }

    const refreshToken = await generateRefreshToken();

    if(!refreshToken){
        throw new apiError("Error in generating token", 400)
    }

    foundUser.refreshToken = refreshToken;

    foundUser.save({validateBeforeSave: false});

    return response.status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(
        new apiResponse(200, loggedInUser, "Logged in successfully")
    )
})

export { loginUser }