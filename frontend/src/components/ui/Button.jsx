import React from "react";
import { twMerge } from "tailwind-merge";

const Button = (props) => {
  return (
    <button
      {...props}
      type={props.type ? props.type : "button"}
      className={twMerge(
        "border px-3 w-full block py-2.5 rounded-md bg-blue-500 text-white font-medium hover:bg-opacity-95 transition-opacity",
        props.className
      )}
    >
      {props.text}
    </button>
  );
};

export default Button;
