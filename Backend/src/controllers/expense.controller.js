import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import Expense from "../models/expense.model.js";
import Category from "../models/category.model.js";

const addExpense = asyncHandler(async (req, res) => {
  const expenseData = { userId: req.user._id, ...req.body };

  const category = await Category.findOne({
    _id: req.body.categoryId,
    $or: [{ userId: req.user._id }, { userId: null }],
  });
  if (!category) throw new ApiError(404, "Category does not exists");

  const expense = await Expense.create(expenseData);
  if (!expense) throw new ApiError(500, "Expense not created");

  res.status(201).json(new ApiResponse(201, "Expense is created", expense));
});

//need to modify ass filters
const getAllExpenses = asyncHandler(async (req, res) => {
  const {
    category,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    paymentMethod,
    search,
    page = 1,
    limit = 20,
    sortBy = "date",
    sortOrder = "desc",
  } = req.query;

  const skip = (page - 1) * limit; // How many documents to skip

  const filter = { userId: req.user._id };

  if (category) filter.categoryId = category;
  if (paymentMethod) filter.paymentMethod = paymentMethod;
  if (search) filter.title = { $regex: search, $options: "i" };

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  if (minAmount || maxAmount) {
    filter.amount = {};
    if (minAmount) filter.amount.$gte = Number(minAmount);
    if (maxAmount) filter.amount.$lte = Number(maxAmount);
  }

  const [expenses, total] = await Promise.all([
    Expense.find(filter)
      .populate("categoryId")
      .sort({
        [sortBy]: sortOrder === "asc" ? 1 : -1,
      })
      .skip(skip)
      .limit(limit),
    Expense.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, "Expenses fetched successfully", {
      expenses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }),
  );
});

const getExpense = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const expense = await Expense.findOne({ _id, userId: req.user._id });
  if (!expense) throw new ApiError(404, "Expense not found");

  res.status(200).json(new ApiResponse(200, "Expense retrieved", expense));
});

const updateExpense = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  if (!_id) throw new ApiError(400, "id not found");

  if (req.body.categoryId) {
    const category = await Category.findOne({
      _id: req.body?.categoryId,
      $or: [{ userId: req.user._id }, { userId: null }],
    });
    if (!category) throw new ApiError(404, "Category does not exists");
  }

  const expense = await Expense.findOneAndUpdate(
    { _id, userId: req.user._id },
    req.body,
    { returnDocument: "after", runValidators: "true" },
  );
  if (!expense) throw new ApiError(404, "Expense not found");
  res.status(200).json(new ApiResponse(200, "Expense updated", expense));
});

const deleteExpense = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  if (!_id) throw new ApiError(400, "id not found");

  const expense = await Expense.findOneAndDelete({ _id, userId: req.user._id });
  if (!expense) throw new ApiError(404, "Expense not found");
  res.status(200).json(new ApiResponse(200, "Expense deleted", expense));
});

const deleteBulkExpenses = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  const result = await Expense.deleteMany({
    _id: { $in: ids },
    userId: req.user._id,
  });

  if (result.deletedCount === 0)
    throw new ApiError(400, "none of the ids you sent were valid");
  res
    .status(200)
    .json(
      new ApiResponse(200, "Deleted selected expenses", result.deletedCount),
    );
});

const reassignCategory = asyncHandler(async (req, res) => {
  const { fromCategoryId, toCategoryId } = req.body;

  const categoryExistance = await Category.find({
    _id: { $in: [fromCategoryId, toCategoryId] },
    $or: [{ userId: null }, { userId: req.user._id }],
  });

  if (categoryExistance.length < 2)
    throw new ApiError(400, "Category does not exists");

  const reassignedCategory = await Expense.updateMany(
    { categoryId: fromCategoryId, userId: req.user._id },
    { categoryId: toCategoryId },
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Category changed", reassignedCategory));
});

export {
  addExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
  deleteBulkExpenses,
  reassignCategory,
};
