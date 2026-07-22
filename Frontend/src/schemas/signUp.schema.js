import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  defaultPicture: z
    .file()
    .mime(["image/jpeg", "image/png"], "Only JPEG and PNG images are allowed")
    .max(5 * 1024 * 1024, "File size must be less than 5MB"),
});

export default signUpSchema;