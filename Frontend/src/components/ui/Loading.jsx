import React from "react";

const SIZE_MAP = {
  sm: { wrapper: "w-10 h-10", ring: "border-2", mark: "w-5 h-5 text-[10px]" },
  md: { wrapper: "w-16 h-16", ring: "border-4", mark: "w-8 h-8 text-sm" },
  lg: { wrapper: "w-24 h-24", ring: "border-4", mark: "w-12 h-12 text-lg" },
};

function Loading({ size = "md", text, fullscreen = false }) {
  const s = SIZE_MAP[size] ?? SIZE_MAP.md;

  return (
    <div
      role="status"
      aria-live="polite"
      className={
        fullscreen
          ? "min-h-dvh w-full grid place-items-center bg-gray-100 dark:bg-gray-950"
          : "w-full grid place-items-center py-12"
      }
    >
      <div className="flex flex-col items-center gap-4">
        <div className={`relative ${s.wrapper}`}>
          {/* Rotating track */}
          <div
            className={`absolute inset-0 rounded-full ${s.ring} border-gray-200 dark:border-gray-800 border-t-myGreenMD animate-spin motion-reduce:animate-none`}
          />

          {/* Brand mark, echoes the sidebar logo tile */}
          <div className="absolute inset-0 grid place-items-center">
            <div
              className={`flex items-center justify-center ${s.mark} rounded-lg bg-gradient-to-br from-myGreenMD to-myGreenSM text-white font-bold shadow-md animate-pulse motion-reduce:animate-none`}
            >
              X
            </div>
          </div>
        </div>

        {text && (
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 font-poppins">
            {text}
          </p>
        )}

        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}

export default Loading;
