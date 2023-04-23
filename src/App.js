import { AuthProvider } from "context/Auth-context";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import UserAddNew from "user/UserAddNew";
import UserUpdate from "user/UserUpdate";

const UserManage = React.lazy(() => import("user/UserManage"));
const HomeLayout = React.lazy(() => import("./layout/HomeLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const TechPage = React.lazy(() => import("./pages/TechPage"));

const PostUpdate = React.lazy(() => import("modules/post/PostUpdate"));
const PostAddNew = React.lazy(() => import("modules/post/PostAddNew"));
const PostManage = React.lazy(() => import("modules/post/PostManage"));

const DashboardLayout = React.lazy(() => import("layout/DashboardLayout"));

const DashboardPage = React.lazy(() => import("pages/DashboardPage"));
const PostDetailPage = React.lazy(() => import("pages/PostDetailPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));
const SignUpPage = React.lazy(() => import("pages/SignUpPage"));

const CategoryAddNew = React.lazy(() =>
  import("modules/category/CategoryAddNew")
);
const CategoryManage = React.lazy(() =>
  import("modules/category/CategoryManage")
);
const CategoryUpdate = React.lazy(() =>
  import("modules/category/CategoryUpdate")
);

function App() {
  return (
    <div className="App">
      <>
        <AuthProvider>
          <Suspense>
            <Routes>
              <Route element={<HomeLayout></HomeLayout>}>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/tech" element={<TechPage></TechPage>}></Route>
                <Route
                  path="/:slug"
                  element={<PostDetailPage></PostDetailPage>}
                ></Route>
              </Route>
              <Route element={<DashboardLayout></DashboardLayout>}>
                <Route
                  path="/dashboard"
                  element={<DashboardPage></DashboardPage>}
                ></Route>
                <Route
                  path="/manage/post"
                  element={<PostManage></PostManage>}
                ></Route>
                <Route
                  path="/manage/user"
                  element={<UserManage></UserManage>}
                ></Route>
                <Route
                  path="/manage/add-user"
                  element={<UserAddNew></UserAddNew>}
                ></Route>
                <Route
                  path="/manage/update-user"
                  element={<UserUpdate></UserUpdate>}
                ></Route>
                <Route
                  path="/manage/add-post"
                  element={<PostAddNew></PostAddNew>}
                ></Route>
                <Route
                  path="/manage/add-category"
                  element={<CategoryAddNew></CategoryAddNew>}
                ></Route>
                <Route
                  path="/manage/category"
                  element={<CategoryManage></CategoryManage>}
                ></Route>
                <Route
                  path="/manage/update-post"
                  element={<PostUpdate></PostUpdate>}
                ></Route>
                <Route
                  path="/manage/update-category"
                  element={<CategoryUpdate></CategoryUpdate>}
                ></Route>
              </Route>
              <Route
                path="/sign-up"
                element={<SignUpPage></SignUpPage>}
              ></Route>
              <Route
                path="/sign-in"
                element={<SignInPage></SignInPage>}
              ></Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </>
    </div>
  );
}

export default App;
