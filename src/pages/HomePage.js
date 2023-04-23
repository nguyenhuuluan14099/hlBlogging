import HomeFeaturePosts from "modules/home/HomeFeaturePosts";
import HomeNewestUpdate from "modules/home/HomeNewestUpdate";
import React from "react";
import styled from "styled-components";
import HomeBanner from "../modules/home/HomeBanner";

const HomeStyled = styled.div`
  .truncateBannerTitle:hover,
  .titleArticle:hover {
    text-decoration: underline 3px;
    text-decoration-color: ${(props) => props.theme.textPrimary};
  }
`;
const HomePage = () => {
  return (
    <HomeStyled>
      <div className="container m-auto">
        <HomeBanner></HomeBanner>

        <HomeFeaturePosts></HomeFeaturePosts>
        <HomeNewestUpdate></HomeNewestUpdate>
      </div>
    </HomeStyled>
  );
};

export default HomePage;
