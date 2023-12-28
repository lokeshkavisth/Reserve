import { twMerge } from "tailwind-merge";

const Checkbox = (props) => {
  const { htmlFor, label, className, ...restProps } = props;
  return (
    <div>
      <input type="checkbox" className="hidden peer" {...restProps} />
      <label
        htmlFor={htmlFor}
        className={twMerge(
          "w-20 block rounded-md bg-gray-50 border p-2 font-medium text-sm text-center peer-checked:bg-blue-500 peer-checked:text-white",
          className
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
