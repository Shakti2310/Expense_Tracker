import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import UserAuthPage from "./components/UserAuthPage";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="bg-myGray bg-cover min-h-dvh font-poppins flex justify-center items-center text-white">
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
