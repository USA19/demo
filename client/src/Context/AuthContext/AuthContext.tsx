import { FC, useState, createContext, SetStateAction } from "react";
import { loggedInUserApi } from "./Api";
import history from "../../history";
import { User } from "../../Interfaces/User";
import { removeToken } from "../../Utils/Token";

export const AuthContext = createContext({
  isSignedIn: false,
  user: null,
  loading: false,
  setIsSignedIn: (data: boolean) => {},
  setUser: (data: User | null) => {},
  handleSignout: () => {},
  setLoading: (value: SetStateAction<boolean>) => {},
  getLoggedInUser: () => {},
});

export const AuthProvider: FC = (props): JSX.Element => {
  const { children } = props;
  const [isSignedIn, isSignedInSetter] = useState<boolean>(false);
  const [user, userSetter] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setUser = (user: User) => {
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

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const user = await loggedInUserApi();
      isSignedInSetter(true);
      userSetter(user);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
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
        getLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
