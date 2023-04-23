import { Button } from "components/button";
import { useAuth } from "context/Auth-context";
import { auth } from "firebase-app/firebaseConfig";
import { signOut } from "firebase/auth";
import NotFoundPage from "pages/NotFoundPage";
import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SideBarStyled = styled.div`
  .isActive,
  .itemSidebar:hover {
    background-color: ${(props) => props.theme.bgPrimary};
    color: ${(props) => props.theme.textPrimary};
  }
`;
const sideBarList = [
  {
    url: "/dashboard",
    icon: <ion-icon name="grid-outline"></ion-icon>,
    title: "Dashboard",
  },
  {
    url: "/manage/post",
    icon: <ion-icon name="book-outline"></ion-icon>,
    title: "Post",
  },
  {
    url: "/manage/category",
    icon: <ion-icon name="copy-outline"></ion-icon>,
    title: "Category",
  },
  {
    url: "/manage/user",
    icon: (
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
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
    title: "User",
  },
  {
    onClick: () => signOut(auth),
    icon: <ion-icon name="log-in-outline"></ion-icon>,
    title: "Log Out",
  },
];
const styleItemSideBar = `rounded-lg transition-all p-3 itemSidebar  text-lg `;
const DashboardLayout = () => {
  const { userInfo } = useAuth();
  if (!userInfo) return <NotFoundPage></NotFoundPage>;
  console.log(userInfo);
  return (
    <div>
      <div className="header w-full max-w-[1400px] p-3 flex items-center justify-between mb-5 ">
        <div></div>
        <div className="flex items-center gap-x-3">
          <Link to="/manage/add-post">
            <Button>Add New Post</Button>
          </Link>
          <Link
            to="/profile"
            title={userInfo?.fullname?.split(" ").slice(-1)}
            className="flex items-center gap-x-2"
          >
            <img
              src={userInfo?.avatar}
              alt=""
              className="cursor-pointer w-10 h-10 rounded-full object-cover"
            />
            {/* <p className="font-semibold text-orange-400">
              {userInfo.fullname.split(" ").slice(-1)}
            </p> */}
          </Link>
        </div>
      </div>
      <div className="flex  gap-x-10 container w-full m-auto">
        <SideBarStyled className="sideBar flex flex-col gap-y-3">
          <div className="shrink-0 flex items-center  text-2xl font-semibold text-primary">
            <Link to="/">HL Blogging</Link>
          </div>
          <div className="flex flex-col ">
            {sideBarList.map((item) => {
              if (item.onClick)
                return (
                  <div
                    onClick={item.onClick}
                    key={item.title}
                    className={`flex items-center gap-x-2 cursor-pointer ${styleItemSideBar}`}
                  >
                    <span>{item.icon}</span>
                    <p>{item.title}</p>
                  </div>
                );
              return (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={({ isActive }) =>
                    isActive
                      ? `isActive ${styleItemSideBar}`
                      : `${styleItemSideBar}`
                  }
                >
                  <div className="flex items-center gap-x-2">
                    <span>{item.icon}</span>
                    <p>{item.title}</p>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </SideBarStyled>
        <div className="flex-1 content">{<Outlet></Outlet>}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
