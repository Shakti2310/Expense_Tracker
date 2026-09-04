import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true },
);

categorySchema.index(
  { userId: 1, name: 1 },
  { unique: true, partialFilterExpression: { userId: { $exists: true } } },
);
categorySchema.index(
  { name: 1 },
  { unique: true, partialFilterExpression: { userId: { $exists: false } } },
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
