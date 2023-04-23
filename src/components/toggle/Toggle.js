import React from "react";

const Toggle = ({ on, onClick = () => {}, ...rest }) => {
  return (
    <label>
      <input
        type="checkbox"
        onChange={() => {}}
        onClick={onClick}
        className="hidden"
        checked={on}
      />
      <div
        className={`w-[70px] cursor-pointer h-[40px] relative rounded-3xl p-[3px]  ${
          on ? "bg-orange-500" : "bg-slate-400"
        }`}
      >
        <span
          className={`w-[34px] h-[34px] transition-all rounded-full absolute ${
            on ? "translate-x-[30px] bg-white" : "bg-slate-200"
          }`}
        ></span>
      </div>
    </label>
  );
};

export default Toggle;
