import { twMerge } from "tailwind-merge";

const Input = (props) => {
  const { name, label, icon, type, className, placeholder, ...restProps } =
    props;
  return (
    <div>
      <label htmlFor={name} className="mb-1 text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 ">
            {icon}
          </div>
        )}

        <input
          {...restProps}
          name={name}
          type={type ? type : "text"}
          className={twMerge(
            `text-sm pr-4 rounded-md w-full py-2.5 focus:outline-none border border-gray-300 focus:border-blue-400 ${
              icon ? "pl-10" : "pl-4"
            }`,
            className
          )}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
