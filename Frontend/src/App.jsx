import { useState } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { LoggingContext } from "./contexts/LoggingContext.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const [isLogged, setIsLogged] = useState(true);
  return (
    <div className="min-h-dvh font-nunito flex">
      <LoggingContext.Provider value={setIsLogged}>
        <ToastContainer theme="dark" />
        <Sidebar />
        <div className="w-full overflow-hidden bg-blue-300">
          <Outlet />
        </div>
      </LoggingContext.Provider>
    </div>
  );
}

export default App;
