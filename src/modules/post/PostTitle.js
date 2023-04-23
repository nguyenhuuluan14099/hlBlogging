import React from "react";
import { Link } from "react-router-dom";

const PostTitle = ({
  children = "Best Gym Equipment for Building Abs and Legs",
  to = "",
}) => {
  return (
    <Link to={to} className="titleArticle text-xl leading-6 cursor-pointer">
      {children}
    </Link>
  );
};

export default PostTitle;
