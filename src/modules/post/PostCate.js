import React from "react";
import { Link } from "react-router-dom";

const PostCate = ({ to, children }) => {
  return (
    <div>
      <Link to={to} className="uppercase text-[13px] category ">
        {children}
      </Link>
    </div>
  );
};

export default PostCate;
