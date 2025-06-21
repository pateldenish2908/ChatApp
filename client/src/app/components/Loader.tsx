"use client";

import React from "react";

const Loader = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black opacity-70 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 p-6 rounded-xl">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
