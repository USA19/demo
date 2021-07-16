import React, { FC, ReactChild, ReactChildren, useState } from "react";
import { loginApi, signupApi } from "./Api";
import history from "../../history";
import { User, signin } from "../../Interfaces/User";

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
  handleSignup: (data: User) => {},
  handleSignout: () => {},
  handleSignin: (data: signin) => {},
});

export const AuthProvider: FC = (props): JSX.Element => {
  const { children } = props;
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignin = async (data: signin) => {
    setLoading(true);
    const user = await loginApi(data);
    setUser(user);
    setIsSignedIn(true);
    setLoading(false);
    history.push("/");
  };

  const handleSignout = () => {
    // setAuth({ loading: false, isSignedIn: false, user: null });
  };

  const handleSignup = async (data: User) => {
    setLoading(true);
    const isSucceed = await signupApi(data);
    if (isSucceed) {
      history.push("/");
    }
    setLoading(false);
    // setAuth({ loading: false, isSignedIn: true, user: user });
  };
  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
        loading,
        handleSignin,
        handleSignout,
        handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
