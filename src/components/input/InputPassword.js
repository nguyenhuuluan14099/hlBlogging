import IconEyeClose from "components/icons/IconEyeClose";
import IconEyeOpen from "components/icons/IconEyeOpen";
import React from "react";
import { useState } from "react";
import Input from "./Input";
const InputPassword = ({ control }) => {
  const [showPassword, setShowPassword] = useState(false);
  if (!control) return;
  return (
    <div className="relative ">
      <Input
        name="password"
        control={control}
        placeholder="please enter your password"
        type={!showPassword ? "password" : "text"}
        className="w-full flex-1 focus:border-orange-600 focus:outline-orange-600 transition-all placeholder:text-slate-400 bg-slate-100 focus:bg-white p-2 rounded-lg border border-orange-200 placeholder:text-[15px]"
      />
      {!showPassword ? (
        <IconEyeClose
          onClick={() => setShowPassword(true)}
          className="shrink-0 w-[40px] h-[30px] absolute top-2/4 -translate-y-2/4 right-5 flex items-center justify-center bg-slate-100 cursor-pointer"
        ></IconEyeClose>
      ) : (
        <IconEyeOpen
          onClick={() => setShowPassword(false)}
          className=" w-[40px] h-[30px] absolute top-2/4 -translate-y-2/4 right-5 flex items-center justify-center bg-slate-100 cursor-pointer"
        ></IconEyeOpen>
      )}
    </div>
  );
};

export default InputPassword;
