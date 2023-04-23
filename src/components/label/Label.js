import React from "react";

const Label = ({ htmlFor = "", children }) => {
  return (
    <label className="cursor-pointer font-semibold" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
