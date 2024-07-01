import { 
  createContext, 
  useContext,
  useReducer } from "react";
import authReducer from "@/reducers/AuthReducer";
import { AuthenticatedUser, AuthAction } from "@/types/authentication";

type ContextType = {
  authenticatedUser: AuthenticatedUser;
  dispatch: React.Dispatch<AuthAction>;
};

const authContext = createContext<ContextType>({
  authenticatedUser: {
    userId: "",
    userName: "",
    email: ""
  },
  dispatch: () => {}
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children }) => {

    const profile = localStorage.getItem("profile");
    const initialUserState = profile ?
          JSON.parse(profile) :
          { userId: "", userName: "", email: "" };

    const [authenticatedUser, dispatch] = useReducer(authReducer, initialUserState);

    return (
      <authContext.Provider value={{
        authenticatedUser,
        dispatch
      }}>
        {children}
      </authContext.Provider>
    );
};

export const useAuthStateContext = () => useContext(authContext);