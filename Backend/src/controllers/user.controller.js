import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const getUsers = asyncHandler(async (req, res) => {
  const allUsers = User.find({});
  res.status(200).json({ users: allUsers });
});

const registerUser = asyncHandler(async (req, res) => {
  // Getting user details from client
  const { username, fullname, email, password } = req.body;

  // Checking any data is missing or not
  if ([username, fullname, email, password].some((item) => item === ""))
    throw new ApiError(400, "Details missing");

  // Finding user if already existed
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  // Throwing error if user is existed already
  if (existedUser) throw new ApiError(409, "User already existed");

  // Getting the user picture from client
  const dpLocalPath = req.files?.defaultPicture[0]?.path;

  // Checking for picture is provided or not
  if (!dpLocalPath) throw new ApiError(400, "Picture not found");

  // Uploading dp to Cloudinary
  const defaultPicture = await uploadOnCloudinary(dpLocalPath);

  // Checking does it uploaded or not
  if (!defaultPicture) throw new ApiError(500, "Cloudinary upload error");

  const user = await User.create({
    username: username.trim().toLowerCase(),
    fullname,
    email,
    password,
    defaultPicture: defaultPicture.url,
  });

  const createdUser = await User.findById(user._id, "-password -refreshToken");

  if (!createdUser) throw new ApiError(500, "User not registered");

  // Sending the response and status code
  return res
    .status(201)
    .json(new ApiResponse(200, "User registered successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {});

export { getUsers, registerUser, loginUser };
