import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar.jsx";
import UserAuthPage from "./pages/UserAuthPage.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="bg-myGray bg-cover min-h-dvh font-poppins flex justify-center items-center text-white">
      <ToastContainer theme="dark" />
      {isLogged ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <>
          <UserAuthPage setIsLogged={setIsLogged} />
        </>
      )}
    </div>
  );
}

export default App;
