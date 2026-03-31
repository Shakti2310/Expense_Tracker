import { useState } from "react";
import googleIcon from "../assets/google.png";
import facebookIcon from "../assets/facebook.png";
import githubIcon from "../assets/github.png";

function UserAuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[60%] h-[80%] rounded-lg overflow-hidden relative ">
        <SignIn isSignIn={isSignIn} />
        <SignUp isSignIn={isSignIn} />
        <div
          className={`absolute transition-transform ease-in-out duration-700 flex flex-col justify-center gap-10 items-center left-1/2 w-1/2 h-full bg-violet-600 ${isSignIn ? "translate-x-0 opacity-100 z-20" : "-translate-x-full opacity-0 z-10"}`}
        >
          <div className={`w-full space-y-2 text-center`}>
            <h1 className="text-4xl font-bold">Create account</h1>
            <p>Provide your personal details to use all features</p>
            <button
              className="outline-2 mt-6 pt-2.5 pb-2.5 pr-12 pl-12 rounded-4xl text-sm cursor-pointer font-semibold"
              type="button"
              onClick={() => setIsSignIn(false)}
            >
              SIGN UP
            </button>
          </div>
        </div>
        <div
          className={`absolute transition-transform ease-in-out duration-700 flex flex-col justify-center gap-10 items-center left-1/2 w-1/2 h-full bg-violet-600 ${isSignIn ? "translate-x-0 z-10 opacity-0" : "-translate-x-full opacity-100 z-20"}`}
        >
          <div className={`w-full space-y-2 text-center  `}>
            <h1 className="text-4xl font-bold">Welcome back!</h1>
            <p>If you already have an account just</p>
            <button
              className="outline-2 mt-6 pt-2.5 pb-2.5 pr-12 pl-12 rounded-4xl text-sm cursor-pointer font-semibold"
              type="button"
              onClick={() => setIsSignIn(true)}
            >
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignIn({ isSignIn }) {
  return (
    <div
      className={`absolute transition-transform ease-in-out duration-700 left-0 h-full flex flex-col justify-center w-1/2 space-y-10 p-10 bg-black/20 text-sm ${isSignIn ? "translate-x-0 opacity-100 z-20" : "translate-x-full z-10 opacity-0"}`}
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

        <div className="flex justify-center gap-16">
          <img
            className="w-8 object-contain rounded-full cursor-pointer"
            src={googleIcon}
          />
          <img
            className="w-9 object-contain rounded-full cursor-pointer"
            src={githubIcon}
          />
          <img
            className="w-9 object-contain rounded-full cursor-pointer"
            src={facebookIcon}
          />
        </div>
      </form>
    </div>
  );
}

function SignUp({ isSignIn }) {
  return (
    <div
      className={`absolute transition-transform ease-in-out duration-700 left-0 h-full flex flex-col justify-center w-1/2 space-y-10 p-10 bg-black/20 text-sm ${isSignIn ? "translate-x-0 z-10 opacity-0" : "translate-x-full z-20 opacity-100"}`}
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
