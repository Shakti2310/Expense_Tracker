import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar.jsx";
import UserAuthPage from "./pages/UserAuthPage.jsx";
import { ToastContainer } from "react-toastify";
import { LoggingContext } from "./contexts/LoggingContext.jsx";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="bg-myGray bg-cover min-h-dvh font-poppins flex justify-center items-center text-white">
      <LoggingContext.Provider value={setIsLogged}>
        <ToastContainer theme="dark" />
        {isLogged ? (
          <>
            <Navbar />
            <Outlet />
          </>
        ) : (
          <>
            <UserAuthPage />
          </>
        )}
      </LoggingContext.Provider>
    </div>
  );
}

export default App;
