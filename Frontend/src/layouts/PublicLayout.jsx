import { Outlet } from "react-router";
import PublicNavbar from "../components/layout/public/PublicNavbar.jsx";

function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  );
}

export default PublicLayout;
