import React, { useContext } from "react";
import history from "./history";
import { Route, Router } from "react-router-dom";
import { authRoutes, AppRoutes } from "./Routes/appRoutes";
import FullPageLoader from "./Components/FullPageLoader";
import { AuthContext, AuthProvider } from "./Context/AuthContext/AuthContext";
function App() {
  // return authRoutes.map(route=><Route >);
  const context = useContext(AuthContext);
  return (
    <AuthProvider>
      {context.loading ? <FullPageLoader /> : ""}
      <Router history={history}>
        {!context.isSignedIn
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
    </AuthProvider>
  );
}

export default App;
