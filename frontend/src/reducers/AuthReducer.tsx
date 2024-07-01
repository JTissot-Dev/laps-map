import { AuthenticatedUser, AuthAction } from "@/types/authentication";


const authReducer = (state: AuthenticatedUser, action: AuthAction) => {
  switch (action.type) {
    case 'login':
      localStorage.setItem("profile", action.authenticatedUser);
      return JSON.parse(action.authenticatedUser);
    case 'logout':
      localStorage.removeItem("profile");
      return {
        userId: "",
        userName: "",
        email: ""
      };
    case 'signup':
      localStorage.setItem("profile", action.authenticatedUser);
      return JSON.parse(action.authenticatedUser);
    default:
      return state;
  };
};

export default authReducer;