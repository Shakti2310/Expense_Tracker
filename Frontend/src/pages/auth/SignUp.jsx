import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/user.api.js";
import Loading from "../../components/ui/loading.jsx";
import SignUpForm from "../../components/auth/SignUpForm.jsx";
import signUpSchema from "../../schemas/signUp.schema.js";

function SignUp() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [defaultPicture, setDefaultPicture] = useState(null);

  const { isPending, mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/authentication/register/email-verification");
    },
    onError: (error) => {
      if (error?.status == 409) toast.error("User already exists");
      else toast.error("All details are required");
    },
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formObject = {
      username,
      fullname,
      email,
      password,
      defaultPicture,
    };

    // Validate form data using Zod schema
    try {
      const result = signUpSchema.safeParse(formObject);
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }
    } catch (error) {
      toast.error("Validation failed. Please check your input.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("defaultPicture", defaultPicture);

    mutate(formData);
  };

  return isPending ? (
    <Loading />
  ) : (
    <SignUpForm
      fullname={fullname}
      setFullname={setFullname}
      email={email}
      setEmail={setEmail}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      agreed={agreed}
      setAgreed={setAgreed}
      defaultPicture={defaultPicture}
      setDefaultPicture={setDefaultPicture}
      onSubmitHandler={onSubmitHandler}
    />
  );
}

export default SignUp;
