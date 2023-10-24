import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import DefaultLayout from "./components/Layout/DefaultLayout/DefaulLayout";
import HomeUser from "./pages/User/HomeUser/views/HomeUser";
import Summary from "./pages/User/Overview/Summary/Summary";
import ProjectDetails from "./pages/User/ProjectSettings/Components/ProjectDetails";

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
          {/* <Route path="/details">
            <ProjectDetails></ProjectDetails>
          </Route> */}
        </Routes>





      </div>
    </Router>
  );
}

export default App;
