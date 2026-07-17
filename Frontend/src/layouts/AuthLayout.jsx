import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="min-h-dvh font-nunito">
      <ToastContainer theme="dark" />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
