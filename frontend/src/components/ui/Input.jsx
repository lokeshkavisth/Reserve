import React from "react";
import { twMerge } from "tailwind-merge";

const Input = (props) => {
  return (
    <div>
      <label htmlFor={props.name} className="mb-1 text-sm font-medium">
        {props.label}
      </label>
      <div className="relative">
        {props.icon && (
          <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 ">
            {props.icon}
          </div>
        )}

        <input
          {...props}
          type={props.type ? props.type : "text"}
          className={twMerge(
            `text-sm pr-4 rounded-md w-full py-2.5 focus:outline-none border border-gray-300 focus:border-blue-400 ${
              props.icon ? "pl-10" : "pl-4"
            }`,
            props.className
          )}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
