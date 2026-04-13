import { useState } from "react";
import { toast } from "react-toastify";
import assets from "../assets/assets.js";
import AuthInput from "./AuthInput.jsx";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/userApi.js";

function SignUp({ setIsSignIn }) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [defaultPicture, setDefaultPicture] = useState(null);

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => {
      if (error?.status == 409) toast.error("User already exists");
      else toast.error("All details are required");
    },
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username.trim());
    formData.append("fullname", fullname.trim());
    formData.append("email", email.trim());
    formData.append("password", password.trim());
    formData.append("defaultPicture", defaultPicture);

    registerMutation.mutate(formData);
  };

  return registerMutation.isPending ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="rounded-lg w-[45%] flex flex-col justify-center space-y-8 p-10 bg-black/20 text-sm">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Sign up!</h1>
        <p className="text-sm">Enter to details to create an account</p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={onSubmitHandler}>
        <div className="flex gap-5">
          <div className="border-r-3 flex flex-col justify-center items-center border-myGraySoft w-1/3">
            <label
              htmlFor="defaultPicture"
              className="flex flex-col h-[50%] items-center cursor-pointer gap-1.5"
            >
              <div className=" outline-2 hover:bg-myGraySoft/50 outline-fuchsia-500 size-25 rounded-full flex justify-center items-center">
                <img
                  className="w-10 object-contain"
                  src={defaultPicture ? assets.uploadSuccess : assets.uploadImg}
                />
              </div>
              <span className="text-xs hover:text-fuchsia-800 text-fuchsia-500 underline">
                Upload Image
              </span>
            </label>
            <input
              type="file"
              name="defaultPicture"
              id="defaultPicture"
              accept="image/*"
              onChange={(e) => setDefaultPicture(e.target.files[0])}
              hidden
            />
            <span className="text-xs">Already have an account!!</span>
            <button
              className="text-fuchsia-500 hover:text-fuchsia-800 cursor-pointer text-xs underline font-semibold"
              type="button"
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>
          </div>
          <div className="w-2/3 space-y-2">
            <AuthInput
              name={"Fullname"}
              type={"text"}
              msg={"Enter your full name"}
              setValue={setFullname}
              value={fullname}
            />
            <AuthInput
              name={"email"}
              type={"text"}
              msg={"Enter your email address"}
              setValue={setEmail}
              value={email}
            />
            <AuthInput
              name={"Username"}
              type={"text"}
              msg={"set your username"}
              setValue={setUsername}
              value={username}
            />
            <AuthInput
              name={"Password"}
              type={"password"}
              msg={"set a strong password"}
              setValue={setpassword}
              value={password}
            />

            <div className="flex text-xs justify-between items-center">
              <div>
                <input
                  className="w-2.5 mr-0.5 align-middle cursor-grab active:cursor-grabbing"
                  type="checkbox"
                  name="remember"
                  id="remember"
                />
                <label
                  htmlFor="remember"
                  className="cursor-grab active:cursor-grabbing"
                >
                  Remember me
                </label>
              </div>
              <div className="cursor-grab active:cursor-grabbing">
                <span>Forgot your password</span>
                <span className="text-[8px] text-red-500 align-super">★</span>
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-fuchsia-500 hover:bg-fuchsia-600 text-sm pt-2 pb-2 cursor-pointer rounded-lg disabled:opacity-50"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
