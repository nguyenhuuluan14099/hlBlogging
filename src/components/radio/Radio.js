import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, name, control, children, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label className="flex items-center gap-x-2 cursor-pointer">
      <input
        className="hidden"
        type="radio"
        checked={checked}
        {...field}
        {...rest}
      />
      <div
        className={`w-[25px] h-[25px] cursor-pointer flex items-center justify-center rounded-full  border border-slate-300 p-3 text-white ${
          checked ? "bg-orange-500" : "bg-white"
        }`}
      >
        {checked && (
          <span className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </span>
        )}
      </div>
      <span>{children}</span>
    </label>
  );
};

export default Radio;
