import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default PublicLayout;
