import { useCallback, useState } from "react";

import SignUp from "../components/SignUp.jsx";
import SignIn from "../components/SignIn.jsx";

function UserAuthPage() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {isSignIn ? (
        <SignIn setIsSignIn={setIsSignIn} />
      ) : (
        <SignUp setIsSignIn={setIsSignIn} />
      )}
    </div>
  );
}

export default UserAuthPage;
