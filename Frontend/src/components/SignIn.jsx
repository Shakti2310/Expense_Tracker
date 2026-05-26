import { useContext, useState } from "react";
import assets from "../assets/assets.js";
import AuthInput from "./AuthInput.jsx";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { LoggingContext } from "../contexts/LoggingContext.jsx";
import { loginUser } from "../api/userApi.js";

function SignIn({ setIsSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setIsLogged = useContext(LoggingContext);

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(data.message);
      setIsLogged(true);
    },
    onError: (error) => {
      if (error?.status == "401") toast.error("Incorrect password");
      else if (error?.status == "404") toast.error("User not exists");
      else toast.error("Username and password is required");
      console.log(error);
    },
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      username: username.trim(),
      password: password.trim(),
    };

    mutate(formData);
  }

  return isPending ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="transition-all rounded-lg ease-in-out duration-700 flex flex-col justify-center space-y-10 p-10 bg-black/20 text-sm">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Sign in!</h1>
        <p className="text-sm">Enter to go unlimited access to your data</p>
      </div>

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
        <AuthInput
          name={"Username"}
          type={"text"}
          msg={"Enter your username"}
          setValue={setUsername}
          value={username}
        />
        <AuthInput
          name={"Password"}
          type={"password"}
          msg={"Enter your password"}
          setValue={setPassword}
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

        <button
          className="bg-fuchsia-500 hover:bg-fuchsia-600 text-sm pt-2 pb-2 cursor-pointer rounded-lg"
          type="submit"
        >
          Log in
        </button>

        <div className="flex items-center">
          <div className="grow border-t border-myGrayFont"></div>
          <span className="mx-4 text-myGrayFont">OR</span>
          <div className="grow border-t border-myGrayFont"></div>
        </div>

        <div className="flex justify-center gap-5">
          <div className="ext-center space-x-2 rounded-lg hover:bg-myGraySoft/50 cursor-pointer bg-myGraySoft pr-8 pl-8 pt-2 pb-2">
            <img
              className="w-5 inline-block object-contain rounded-full cursor-pointer"
              src={assets.googleIcon}
            />
            <span>Google</span>
          </div>
          <div className="ext-center space-x-2 rounded-lg hover:bg-myGraySoft/50 cursor-pointer bg-myGraySoft pr-8 pl-8 pt-2 pb-2">
            <img
              className="w-5 inline-block object-contain rounded-full cursor-pointer"
              src={assets.githubIcon}
            />
            <span>GitHub</span>
          </div>
          <div className="ext-center space-x-2 rounded-lg hover:bg-myGraySoft/50 cursor-pointer bg-myGraySoft pr-8 pl-8 pt-2 pb-2">
            <img
              className="w-5 inline-block object-contain rounded-full cursor-pointer"
              src={assets.facebookIcon}
            />
            <span>Facebook</span>
          </div>
        </div>

        <div className="text-center">
          Don't have an account?{" "}
          <button
            className="text-fuchsia-500 cursor-pointer hover:text-fuchsia-700"
            type="button"
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
