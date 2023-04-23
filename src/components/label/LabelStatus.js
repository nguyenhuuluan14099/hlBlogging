import React from "react";
import PropTypes from "prop-types";
const LabelStatus = ({ type = "default", children }) => {
  let className =
    "w-full max-w-[150px] p-3 text-white rounded-lg flex items-center justify-center";
  let labelStyled = "";
  switch (type) {
    case "success":
      labelStyled = "bg-green-200 text-green-500";
      break;
    case "warning":
      labelStyled = "bg-yellow-200 text-yellow-500";
      break;
    case "danger":
      labelStyled = "bg-red-200 text-red-500";
      break;
    default:
      break;
  }
  return <div className={`${labelStyled} ${className}`}>{children}</div>;
};
LabelStatus.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["default", "success", "warning", "danger"]).isRequired,
};
export default LabelStatus;
