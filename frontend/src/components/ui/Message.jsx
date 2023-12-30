import React from "react";
import { twMerge } from "tailwind-merge";

const Message = (props) => {
  const { message, className } = props;
  return (
    <div>
      <p className={twMerge("text-red-500", className)}>{message}</p>
    </div>
  );
};

export default Message;
