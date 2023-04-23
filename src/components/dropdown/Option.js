import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="py-4 z-99 px-5 cursor-pointer flex items-center justify-between hover:text-orange-500 hover:bg-slate-300 rounded-lg transition-all text-sm"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
