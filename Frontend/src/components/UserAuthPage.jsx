import { useState } from "react";
import googleIcon from "../assets/google.png";
import facebookIcon from "../assets/facebook.png";
import githubIcon from "../assets/github.png";

function UserAuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className={`h-screen w-screen flex justify-center items-center`}>
      <div className="w-[40%] h-[80%] rounded-2xl overflow-hidden">
        {isSignIn ? (
          <SignIn setIsSignIn={setIsSignIn} />
        ) : (
          <SignUp setIsSignIn={setIsSignIn} />
        )}
      </div>
    </div>
  );
}

function SignIn({ setIsSignIn }) {
  return (
    <div
      className={`transition-all ease-in-out duration-700 h-full flex flex-col justify-center space-y-10 p-10 bg-black/20 text-sm`}
    >
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Sign in!</h1>
        <p className="text-sm">Enter to go unlimited access to your data</p>
      </div>

      <form className="flex flex-col gap-5">
        <Input name={"Username"} type={"text"} msg={"Enter your username"} />
        <Input
          name={"Password"}
          type={"password"}
          msg={"Enter your password"}
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

        <div class="flex items-center">
          <div class="grow border-t border-myGrayFont"></div>
          <span class="mx-4 text-myGrayFont">OR</span>
          <div class="grow border-t border-myGrayFont"></div>
        </div>

        <div className="flex justify-center gap-5">
          <div className="ext-center space-x-2 rounded-lg hover:bg-myGraySoft/50 cursor-pointer bg-myGraySoft pr-8 pl-8 pt-2 pb-2">
            <img
              className="w-5 inline-block object-contain rounded-full cursor-pointer"
              src={googleIcon}
            />
            <span>Google</span>
          </div>
          <div className="ext-center space-x-2 rounded-lg hover:bg-myGraySoft/50 cursor-pointer bg-myGraySoft pr-8 pl-8 pt-2 pb-2">
            <img
              className="w-5 inline-block object-contain rounded-full cursor-pointer"
              src={githubIcon}
            />
            <span>GitHub</span>
          </div>
          <div className="ext-center space-x-2 rounded-lg hover:bg-myGraySoft/50 cursor-pointer bg-myGraySoft pr-8 pl-8 pt-2 pb-2">
            <img
              className="w-5 inline-block object-contain rounded-full cursor-pointer"
              src={facebookIcon}
            />
            <span>Facebook</span>
          </div>
        </div>

        <div className="text-center">
          Don't have an account?{" "}
          <button
            className="text-fuchsia-500 cursor-pointer hover:text-fuchsia-700"
            type="text"
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

function SignUp({ setIsSignIn }) {
  return (
    <div
      className={`transition-all ease-in-out duration-700 h-full flex flex-col justify-center space-y-10 p-10 bg-black/20 text-sm`}
    >
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Sign up!</h1>
        <p className="text-sm">Enter to details to register</p>
      </div>

      <form className="flex flex-col gap-3">
        <Input name={"Fullname"} type={"text"} msg={"Enter your full name"} />
        <Input name={"email"} type={"text"} msg={"Enter your email address"} />
        <Input name={"Username"} type={"text"} msg={"set your username"} />
        <Input
          name={"Password"}
          type={"password"}
          msg={"set a strong password"}
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
          Sign up
        </button>
      </form>
    </div>
  );
}

function Input({ name, type, msg }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>
        {name}
        <span className="text-[8px] text-red-500 align-super">★</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={msg}
        className="outline-none p-3 bg-white/15 rounded-md"
      />
    </div>
  );
}

export default UserAuthPage;
