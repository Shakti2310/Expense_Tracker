import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/customUI/Loader.jsx";
import SignUpForm from "../../components/auth/SignUpForm.jsx";
import { registerSchema } from "../../validations/user.validation.js";
import { useRegisterUser } from "@/hooks/useAuthUser.js";

function SignUp() {

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [defaultPicture, setDefaultPicture] = useState(null);

  const { isPending, mutate } = useRegisterUser()

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
      const result = registerSchema.safeParse(formObject);
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
    <Loader text="Signing up..." />
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
