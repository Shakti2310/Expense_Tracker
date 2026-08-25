import { useNavigate } from "react-router";
import  assets  from "../../assets/assets.js";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="w-8 h-8" />
          <span className="text-lg font-bold text-gray-900">XseTrack</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/authentication/login")}
            className="px-6 py-2.5 text-myGreenMD font-semibold border-2 border-myGreenMD rounded-lg hover:bg-myGreenMD/5 transition-all active:scale-95"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/authentication/register")}
            className="px-6 py-2.5 bg-gradient-to-r from-myGreenMD to-myGreenSM text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
