import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../modules/headers/Header";

const OutletStyled = styled.div`
  background-color: ${(props) => props.theme.bgPrimary};
  min-height: 100vh;
`;
const HomeLayout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <OutletStyled>{<Outlet></Outlet>}</OutletStyled>
    </div>
  );
};

export default HomeLayout;
