import React from "react";

function Loading() {
  return (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-myGreenMD rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
