import React from "react";
import { Link } from "react-router-dom";

const PostImage = ({
  to = "",
  src = "https://images.unsplash.com/photo-1649888317149-05d953c9fef8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGdpcmwlMjBzcXVhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  className = "",
}) => {
  return (
    <Link to={to}>
      <img
        className={`w-full h-[240px] object-cover rounded-t-lg ${className}`}
        src={src}
        alt=""
      />
    </Link>
  );
};

export default PostImage;
