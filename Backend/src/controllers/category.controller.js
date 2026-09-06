import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import Category from "../models/category.model.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const getAllCategories = asyncHandler(async (req, res) => {
  const category = await Category.find({ userId: req.user._id });
  if (!category)
    throw new ApiError(400, "User do not have any custom category");

  return res.json(new ApiResponse(200, "All categories", category));
});

const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) throw new ApiError(400, "Name is missing");

  const iconLocalPath = req.files?.icon?.[0]?.path;

  const existedCategory = await Category.find({
    userId: req.user._id,
    name: name,
  });
  if (!existedCategory) throw new ApiError(409, "Category already exists");

  if (iconLocalPath) {
    const icon = await cloudinary.uploader.upload(iconLocalPath, {
      resource_type: "auto",
    });
    if (!icon) throw new ApiError(500, "Cloudinary upload failed");

    const category = await Category.create({
      userId: req.user._id,
      name: name.trim(),
      icon: icon.url,
    });
    if (!category) throw new ApiError(500, "Category not created");

    if (iconLocalPath && fs.existsSync(iconLocalPath))
      fs.unlinkSync(iconLocalPath);

    return res
      .status(201)
      .json(new ApiResponse(201, "Category is created", category));
  } else {
    const category = await Category.create({
      userId: req.user._id,
      name: name.trim(),
    });
    if (!category) throw new ApiError(500, "Category not created");

    if (iconLocalPath && fs.existsSync(iconLocalPath))
      fs.unlinkSync(iconLocalPath);

    return res
      .status(201)
      .json(new ApiResponse(201, "Category is created", category));
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  if (!_id) throw new ApiError(400, "id not found");

  const category = await Category.findById(_id);
  if (!category) throw new ApiError(404, "Category does not exists");

  return res
    .status(200)
    .json(new ApiResponse(200, "Single category fetched", category));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) throw new ApiError(400, "New name not found");

  const _id = req.params.id;
  if (!_id) throw new ApiError(400, "id not found");

  const updatedCategory = await Category.findOneAndUpdate(
    { _id: _id },
    { $set: { name: name } },
    { returnDocument: "after" },
  );
  if (!updateCategory) throw new ApiError(404, "Category does not exists");

  res
    .status(200)
    .json(new ApiResponse(200, "Category name changed", updatedCategory));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  if (!_id) throw new ApiError(400, "id not found");

  const deletedCategory = await Category.findByIdAndDelete(_id);
  if (!deletedCategory) throw new ApiError(400, "Category does not exists");

  res.status(200).json(new ApiResponse(200, "category deleted"));
});

const deleteAllCategories = asyncHandler(async (req, res) => {
  const result = await Category.deleteMany({ userId: req.user._id });
  if (!result) throw new ApiError(400, "User do not have any custom category");

  res.status(200).json(200, "All categories deleted");
});

export {
  getAllCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
};
