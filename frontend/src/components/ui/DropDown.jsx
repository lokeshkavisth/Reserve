import React from "react";
import Select from "react-select";

const DropDown = (props) => {
  return (
    <div>
      <label htmlFor={props.htmlFor} className="mb-1 text-sm font-medium">
        {props.label}
      </label>
      <Select
        {...props}
        isSearchable
        isClearable
        classNames={{
          control: () =>
            "h-11 !border !focus:outline-none !border-gray-300 !focus:border-blue-400 !text-sm !rounded-md",
        }}
      />
    </div>
  );
};

export default DropDown;
