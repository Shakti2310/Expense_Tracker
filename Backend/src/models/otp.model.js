import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const otpSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["verification", "reset-password"],
      required: true,
    },

    otpHash: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

otpSchema.pre("save", async function () {
  if (!this.isModified("otpHash")) return;
  this.otpHash = await bcrypt.hash(this.otpHash, 10);
});

otpSchema.methods.verifyOtp = async function (otp) {
  return await bcrypt.compare(otp, this.otpHash);
};

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
