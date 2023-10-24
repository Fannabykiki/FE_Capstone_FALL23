import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import DefaultLayout from "./components/Layout/DefaultLayout/DefaulLayout";
import HomeUser from "./pages/User/HomeUser/views/HomeUser";
import Summary from "./pages/User/Overview/Summary/Summary";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import HomeAdmin from "./pages/Admin/HomeAdmin/views/HomeAdmin";
import ListUser from "./pages/Admin/UserManage/ListUser/views/ListUser";
import ListProject from "./pages/Admin/ProjectManage/ListProject";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          <Route
            path="/user/*" // This will match all subroutes of /user
            element={
              <HomeUser>
                <Routes>
                  {/* Define your user-specific routes here */}
                  <Route path="/overview/summary" element={<Summary />} />
                  {/* <Route path="/profile" element={<UserProfile />} /> */}
                </Routes>
              </HomeUser>
            }
          />

          <Route
            path="/admin/*" // This will match all subroutes of /user
            element={
              <HomeAdmin>
                <Routes>
                  {/* Define your user-specific routes here */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/user" element={<ListUser />} />
                  <Route path="/dashboard" element={<ListProject />} />
                  {/* <Route path="/profile" element={<UserProfile />} /> */}
                </Routes>
              </HomeAdmin>
            }
          />
        </Routes>





      </div>
    </Router>
  );
}

export default App;
