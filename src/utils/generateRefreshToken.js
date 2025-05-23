import { User } from "../models/user.model.js"

const generateRefreshToken = async (userId) => {
    const foundUser = await User.findById(userId);
console.log(foundUser)
    const refreshToken = await foundUser.generateRefreshToken();
    console.log("refreshtoken",refreshToken)
    return refreshToken;
}

export { generateRefreshToken }