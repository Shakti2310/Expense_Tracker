import { useState } from "react";
import { Outlet } from "react-router";
import { LoggingContext } from "../contexts/LoggingContext.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";

function App() {
  const [isLogged, setIsLogged] = useState(true);
  return (
    <div className="min-h-dvh font-nunito flex">
      <LoggingContext.Provider value={setIsLogged}>
        <Sidebar />
        <div className="w-full overflow-hidden bg-gray-100">
          <Outlet />
        </div>
      </LoggingContext.Provider>
    </div>
  );
}

export default App;
