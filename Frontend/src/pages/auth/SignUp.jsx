import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/user.api.js";
import Loading from "../../components/ui/loading.jsx";
import SignUpForm from "../../components/auth/SignUpForm.jsx";

function SignUp() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [defaultPicture, setDefaultPicture] = useState(null);

  const { isPending, mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
      localStorage.setItem("email", data.email);
      navigate("/authentication/register/email-verification");
    },
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
      defaultPicture={defaultPicture}
      setDefaultPicture={setDefaultPicture}
      onSubmitHandler={onSubmitHandler}
    />
  );
}

export default SignUp;
