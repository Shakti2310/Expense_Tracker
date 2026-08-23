import User from "../models/user.model.js";

const generateAuthTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    await user.updateOne({ $set: { refreshToken: refreshToken } });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Token generation error: ", error);
  }
};

export { generateAuthTokens };