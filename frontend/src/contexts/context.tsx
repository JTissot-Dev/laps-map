import { 
  createContext, 
  useContext,
  useState } from "react";
  import { CanvasInput } from "@/generated/graphql-types";


const context = createContext({
  isOpenSidebar: false,
  setIsOpenSidebar: (isOpenSidebar: boolean) => {},
  canvas: {} as CanvasInput,
  setCanvas: (canvas: CanvasInput) => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children }) => {

    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
    const [canvas, setCanvas] = useState<CanvasInput>({} as CanvasInput);

    return (
      <context.Provider value={{
        isOpenSidebar,
        setIsOpenSidebar,
        canvas,
        setCanvas,
      }}>
        {children}
      </context.Provider>
    );
};

export const useStateContext = () => useContext(context);