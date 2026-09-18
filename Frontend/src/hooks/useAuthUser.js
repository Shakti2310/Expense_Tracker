import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  getUser,
  verifyUser,
  logoutUser,
  resendOtp,
} from "../api/user.api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function useCurrentUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUser();
      return (
        response?.user ?? response?.data?.user ?? response?.data ?? response
      );
    },
    retry: false,
  });
}

function useRegisterUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["user", "otp"]);
      toast.success(res.message);
      navigate("/authentication/register/email-verification");
    },
    onError: (error) => {
      if (error?.status == 409) toast.error("User already exists");
      else toast.error("All details are required");
    },
  });
}

function useVerifyUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      toast.success(data.message);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Invalid OTP. Please try again.");
    },
  });
}

function useLoginUser() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/dashboard");
    },
    onError: (error) => {
      if (error?.status == 403) {
        toast.error("Email not verified");
        navigate("/authentication/register/email-verification");
      } else if (error?.status == "401") toast.error("Incorrect password");
      else if (error?.status == "404") toast.error("User not exists");
      else toast.error("Username and password is required");
    },
  });
}

function useResendOtp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["otp"]);
      toast.success(res.message);
    },
    onError: (err) => toast.error(err.message),
  });
}

function useLogoutUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (res) => {
      queryClient.clear;
      toast.success("You are logged out successfully");
      navigate("/authentication/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export {
  useCurrentUser,
  useRegisterUser,
  useLoginUser,
  useLogoutUser,
  useResendOtp,
  useVerifyUser,
};
