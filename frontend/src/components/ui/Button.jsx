import { twMerge } from "tailwind-merge";
import Loader from "./Loader";

const Button = (props) => {
  const { loading, type = "button", className, text, ...restProps } = props;
  return (
    <button
      {...restProps}
      disabled={loading}
      type={type}
      className={twMerge(
        "border px-3 w-full block py-2.5 rounded-md bg-blue-500 text-white font-medium hover:bg-opacity-95 transition-opacity min-w-max",
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
