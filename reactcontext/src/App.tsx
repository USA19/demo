import React, { useContext } from "react";
import Navbar  from "./Navbar/Navbar";
import history from "./history";
import { Route, Router } from "react-router-dom";
import { authRoutes, AppRoutes } from "./Routes/appRoutes";
import FullPageLoader from "./Components/FullPageLoader";
import { AuthContext } from "./Context/AuthContext/AuthContext";
import { PostProvider } from "./Context/PostContext/PostContext";
import Alert from "./Components/Alert";
function App() {
  const { isSignedIn, loading } = useContext(AuthContext);

  return (
    <PostProvider>
      <Alert />

      {loading ? <FullPageLoader /> : ""}
      <Router history={history}>
        <Navbar />
        {!isSignedIn
          ? authRoutes.map((route) => (
              <Route
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))
          : AppRoutes.map((route) => (
              <Route
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
      </Router>
    </PostProvider>
  );
}

export default App;
