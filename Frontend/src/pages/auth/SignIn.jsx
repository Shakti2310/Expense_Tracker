import { useState } from "react";
import { useNavigate } from "react-router";
import Loader from "../../components/customUI/Loader.jsx";
import { loginSchema } from "../../validations/user.validation.js";
import { toast } from "react-toastify";
import SignInForm from "../../components/auth/SignInForm.jsx";
import { useLoginUser } from "@/hooks/useAuthUser.js";

function SignIn() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, mutate } = useLoginUser();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      username: username.trim(),
      password: password.trim(),
    };

    try {
      const result = loginSchema.safeParse(formData);
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }
    } catch (error) {
      toast.error("Validation failed. Please check your input.");
      return;
    }

    mutate(formData);
  };

  return isPending ? (
    <Loader text="Signing in..." />
  ) : (
    <SignInForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      onSubmitHandler={onSubmitHandler}
    />
  );
}

export default SignIn;
