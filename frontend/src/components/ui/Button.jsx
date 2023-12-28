import React from "react";
import { CgSpinner } from "react-icons/cg";
import { twMerge } from "tailwind-merge";
import Loader from "./Loader";

const Button = (props) => {
  const { loading, type, className, text, ...restProps } = props;
  return (
    <button
      {...restProps}
      disabled={loading}
      type={type ? type : "button"}
      className={twMerge(
        "border px-3 w-full block py-2.5 rounded-md bg-blue-500 text-white font-medium hover:bg-opacity-95 transition-opacity",
        className
      )}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-1">
          <Loader />
          Processing...
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
