import { Button } from "components/button";
import React from "react";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <div className="flex items-center rounded-lg  mb-5 p-3 bg-gradient-to-br from-orange-600 via-orange-400 to-orange-200 h-full max-h-[500px]">
      <div className="w-full   max-w-[500px] p-3 flex flex-col gap-y-7 mt-[90px]">
        <p className="text-3xl font-bold text-white">HLBlogging</p>
        <p className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          accusamus repellat, harum numquam modi eveniet odit iusto corporis,
          quae reiciendis nobis culpa magnam unde. Inventore quos fugiat
          repellendus maiores accusantium.
        </p>
        <Link to="/sign-in">
          <Button className="shadow-[rgba(50,_50,_93,_0.25)_0px_2px_5px_-1px,rgba(0,_0,_0,_0.3)_0px_1px_3px_-1px]">
            Get Started
          </Button>
        </Link>
      </div>
      <div className="h-[500px] w-[850px]  ">
        <img className="object-cover mt-[80px]" src="./banner.png" alt="" />
      </div>
    </div>
  );
};

export default HomeBanner;
