import React from "react";

const GridBlock = ({ children }) => {
  return (
    <div className="grid grid-cols-2 gap-x-10 w-full my-10">{children}</div>
  );
};

export default GridBlock;
