import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const Input = ({
  placeholder = "",
  type = "text",
  id = null,
  name = "",
  control,
  className = "",
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="flex items-center relative">
      <input
        {...field}
        {...props}
        name={name}
        className={`flex-1 focus:border-orange-600 focus:outline-orange-600 transition-all placeholder:text-slate-400 bg-slate-100 focus:bg-white p-2 rounded-lg border border-orange-200 placeholder:text-[15px] ${className}`}
        type={type}
        id={name}
        placeholder={placeholder}
      />
    </div>
  );
};
Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
};

export default Input;
