import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const otpSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    otpHash: {
      type: String,
      required: [true, "Otp is required"],
    },
  },
  { timestamps: true },
);

otpSchema.pre("save", async function () {
  if (!this.isModified("otpHash")) return;
  this.otpHash = await bcrypt.hash(this.otpHash, 10);
});

otpSchema.methods.verifyOtp = async function (otp) {
  return await bcrypt.compare(otp, this.otpHash);
};

otpSchema.methods.generateVerificationToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.VERIFICATION_TOKEN_SECRET,
    {
      expiresIn: process.env.VERIFICATION_TOKEN_EXPIRY,
    },
  );
};

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
