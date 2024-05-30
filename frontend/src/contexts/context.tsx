import { 
  createContext, 
  useContext,
  useState } from "react";
  import { CanvasInput, Lap } from "@/generated/graphql-types";


type ContextType = {
  isOpenSidebar: boolean;
  setIsOpenSidebar: (isOpenSidebar: boolean) => void;
  canvas: CanvasInput;
  setCanvas: (canvas: CanvasInput) => void;
  searchLaps: Lap[];
  setSearchLaps: (laps: Lap[]) => void;
  currentCity: string;
  setCurrentCity: (city: string) => void;
};

const context = createContext<ContextType>({
  isOpenSidebar: false,
  setIsOpenSidebar: () => {},
  canvas: {
    northEst: "",
    northWest: "",
    southEst: "",
    southWest: ""
  },
  setCanvas: () => {},
  searchLaps: [],
  setSearchLaps: () => {},
  currentCity: "",
  setCurrentCity: () => {}
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children }) => {

    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
    const [canvas, setCanvas] = useState<CanvasInput>({
      northEst: "",
      northWest: "",
      southEst: "",
      southWest: ""
    });
    const [searchLaps, setSearchLaps] = useState<Lap[]>([]);
    const [currentCity, setCurrentCity] = useState<string>("");

    return (
      <context.Provider value={{
        isOpenSidebar,
        setIsOpenSidebar,
        canvas,
        setCanvas,
        searchLaps,
        setSearchLaps,
        currentCity,
        setCurrentCity
      }}>
        {children}
      </context.Provider>
    );
};

export const useStateContext = () => useContext(context);