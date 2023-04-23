import { Button } from "components/button";
import { useAuth } from "context/Auth-context";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
const HeaderStyled = styled.div`
  background-color: ${(props) => props.theme.bgPrimary};
  height: 80px;
  .activeLink {
    color: ${(props) => props.theme.textPrimary};
  }
  .mouseover:hover {
    transition: 0.2s;
    color: ${(props) => props.theme.textPrimary};
  }
`;
const ListCategories = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/tech",
    title: "Technology",
  },
  {
    to: "/train",
    title: "Training",
  },
  {
    to: "/contact",
    title: "Contact",
  },
];
const Header = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderStyled className="header w-full">
      <div className="container flex items-center h-full justify-between m-auto">
        <div className="flex items-center gap-x-5">
          <Link
            to="/"
            className="text-xl font-semibold flex items-center gap-x-2 border border-transparent border-r-slate-400  pr-4"
          >
            <img
              src="./homeLogo.png"
              className="w-10 h-10 rounded-lg object-cover"
              alt=""
            />
            <p>HLBlogging</p>
          </Link>
          <p className="mouseover cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </p>
        </div>
        <div className="flex items-center gap-x-10 ">
          <div className="flex items-center gap-x-5 border border-transparent border-r-slate-400  pr-4">
            {ListCategories.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "activeLink " : "mouseover"
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-x-2 cursor-pointer mouseover">
            {!userInfo ? (
              <Link to="/sign-in" className="flex items-center gap-x-2">
                <p className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                    />
                  </svg>
                </p>
                <p className="">Login</p>
              </Link>
            ) : (
              <div>
                <div className="flex items-center gap-x-2">
                  <img
                    src={userInfo.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <Link to="/dashboard">
                    {" "}
                    <Button className="">Dashboard</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
