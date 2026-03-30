import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      Enum: ["cash", "upi", "card", "netbanking"],
      requied: true,
    },
  },
  { timestamps: true },
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
