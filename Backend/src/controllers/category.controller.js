import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import Category from "../models/category.model.js";
import Expense from "../models/expense.model.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const getAllCategories = asyncHandler(async (req, res) => {
  const category = await Category.find({
    $or: [{ userId: req.user._id }, { userId: null }],
  });
  return res.json(new ApiResponse(200, "All categories", category));
});

const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const iconLocalPath = req.file?.path;

  try {
    const existedCategory = await Category.findOne({
      name: {
        $regex: name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        $options: "i",
      },
      $or: [{ userId: req.user._id }, { userId: null }],
    });
    if (existedCategory) throw new ApiError(409, "Category already exists");

    const categoryData = {
      userId: req.user._id,
      name: name.trim(),
    };

    if (iconLocalPath) {
      const icon = await cloudinary.uploader.upload(iconLocalPath, {
        resource_type: "auto",
      });
      if (!icon) throw new ApiError(500, "Cloudinary upload failed");

      categoryData.icon = icon.url;
    }
    const category = await Category.create(categoryData);
    if (!category) throw new ApiError(500, "Category not created");

    return res
      .status(201)
      .json(new ApiResponse(201, "Category is created", category));
  } finally {
    if (iconLocalPath && fs.existsSync(iconLocalPath))
      fs.unlinkSync(iconLocalPath);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const _id = req.params.id;

  const category = await Category.findOne({ _id: _id, userId: req.user._id });
  if (!category) throw new ApiError(404, "Category does not exists");

  return res
    .status(200)
    .json(new ApiResponse(200, "Single category fetched", category));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const _id = req.params.id;

  const category = await Category.findOne({ _id, userId: req.user._id });
  if (!category) throw new ApiError(404, "Category does not exist");

  if (name && name.toLowerCase() !== category.name.toLowerCase()) {
    const existedCategory = await Category.findOne({
      _id: { $ne: _id },
      name: {
        $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        $options: "i",
      },
      $or: [{ userId: req.user._id }, { userId: null }],
    });
    if (existedCategory)
      throw new ApiError(409, "Category with this name already exists");
  }

  const updatedCategory = await Category.findOneAndUpdate(
    { _id, userId: req.user._id },
    { $set: { name } },
    { returnDocument: "after", runValidators: true },
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Category name changed", updatedCategory));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const _id = req.params.id;

  const expenseCount = await Expense.countDocuments({
    categoryId: _id,
    userId: req.user._id,
  });
  if (expenseCount > 0)
    throw new ApiError(
      400,
      "Category cannot be deleted as it is associated with expenses",
    );

  const deletedCategory = await Category.findOneAndDelete({
    _id: _id,
    userId: req.user._id,
  });
  if (!deletedCategory) throw new ApiError(400, "Category does not exists");

  res.status(200).json(new ApiResponse(200, "category deleted"));
});

export {
  getAllCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
