import React, { FC, useState } from "react";
// import { loginApi, signupApi } from "./Api";
import history from "../../history";
import { User } from "../../Interfaces/User";
import { removeToken } from "../../Utils/Token";

// interface auth {
// children: JSX.Element[];
// isSignedIn: boolean;
// user: null | User;
// loading: boolean;
// handleSignup: (data: User) => {};
// handleSignout: () => {};
// handleSignin: (data: signin) => {};
// }
export const AuthContext = React.createContext({
  isSignedIn: false,
  user: null,
  loading: false,
  setIsSignedIn: (data: boolean) => {},
  setUser: (data: User | null) => {},
  handleSignout: () => {},
  Loader: () => {},
});

export const AuthProvider: FC = (props): JSX.Element => {
  const { children } = props;
  const [isSignedIn, isSignedInSetter] = useState<boolean>(false);
  const [user, userSetter] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log("State of signed in ", isSignedIn);
  const setUser = (user: User | null) => {
    userSetter(user);
  };

  const setIsSignedIn = (arg0: boolean) => {
    isSignedInSetter(arg0);
  };
  const handleSignout = () => {
    removeToken();
    history.push("/");
  };
  const Loader = () => {
    setLoading(!loading);
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
        loading,
        setIsSignedIn,
        handleSignout,
        setUser,
        Loader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
