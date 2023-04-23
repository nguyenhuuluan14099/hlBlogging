import React from "react";
import styled from "styled-components";

const HeadingStyled = styled.div`
  text-align: center;
  p::before {
    content: "";
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 120px;
    height: 6px;
    background-color: ${(props) => props.theme.textPrimary};
    border-radius: 3px;
  }
`;
const Heading = ({ children }) => {
  return (
    <HeadingStyled className="mb-7">
      <p className="relative font-bold text-3xl inline-block mb-5">
        {children}
      </p>
    </HeadingStyled>
  );
};

export default Heading;
