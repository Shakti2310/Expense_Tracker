import { useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../../components/ui/Loading.jsx";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginUser } from "../../api/user.api.js";
import SignInForm from "../../components/auth/SignInForm.jsx";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/dashboard");
    },
    onError: (error) => {
      if (error?.status == "401") toast.error("Incorrect password");
      else if (error?.status == "404") toast.error("User not exists");
      else toast.error("Username and password is required");
    },
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      username: username.trim(),
      password: password.trim(),
    };

    try {
      const result = signInSchema.safeParse(formData);
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }
    } catch (error) {
      toast.error("Validation failed. Please check your input.");
      return;
    }

    mutate(result.data);
  };

  return isPending ? (
    <Loading />
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
