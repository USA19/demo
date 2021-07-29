import React, { FC, useState } from "react";

import history from "../../history";
import { User } from "../../Interfaces/User";
import { removeToken } from "../../Utils/Token";


export const AuthContext = React.createContext({
  isSignedIn: false,
  user: null,
  loading: false,
  setIsSignedIn: (data: boolean) => {},
  setUser: (data: User | null) => {},
  handleSignout: () => {},
  setLoading: (value: React.SetStateAction<boolean>) => {},
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
    isSignedInSetter(false);
    history.push("/");
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
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
