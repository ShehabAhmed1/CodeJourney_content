import React from "react";
import { ChevronsUp } from "lucide-react";

const ButtonUp = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // سكرول ناعم
    });
  };

  return (
    <button
      onClick={handleClick}
      className="z-1000 fixed bottom-5 cursor-pointer right-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-14 h-14 rounded-full shadow-lg transition-all duration-300"
    >
      <ChevronsUp />
    </button>
  );
};

export default ButtonUp;
