import { createContext, useContext } from "react";


const context = createContext({});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <context.Provider value={{}}>
      {children}
    </context.Provider>
  );
};

export const useStateContext = () => useContext(context);