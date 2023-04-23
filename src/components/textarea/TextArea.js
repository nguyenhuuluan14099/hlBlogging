import React from "react";
import { useController } from "react-hook-form";

const TextArea = ({ control, type = "text", name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <textarea
      className="rounded-lg border border-orange-200 outline-none focus:border-orange-500 transition-all w-ful min-h-[200px] p-3 resize-none"
      type={type}
      {...field}
      {...rest}
      id={name}
      name={name}
    ></textarea>
  );
};

export default TextArea;
