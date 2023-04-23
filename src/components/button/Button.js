import React from "react";

const Button = ({
  children,
  className,
  type = "button",
  disabled = false,
  isLoading = false,
  onClick = () => {},
}) => {
  const buttonStyle = `p-3 rounded-lg m-auto bg-orange-500 text-white w-full max-w-[200px] ${className}`;
  return (
    <button
      disabled={disabled ? true : false}
      type={type}
      onClick={onClick}
      className={`${isLoading ? `bg-opacity-40 ${buttonStyle}` : buttonStyle}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center ">
          <div className="w-7 h-7 rounded-full border-white border-t-transparent animate-spin  border-[4px]"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
