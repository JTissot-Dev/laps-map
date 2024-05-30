import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useStateContext } from "@/contexts/context";
import SearchPlace from "../SearchPlace/SearchPlace";
import SearchLaps from "../SearchLaps/SearchLaps";


const SideBar: React.FC = () => {

  const { 
    isOpenSidebar, 
    setIsOpenSidebar,
    searchLaps,
    currentCity } = useStateContext();
  console.log(currentCity)
  return (
    <aside
      className={
        clsx(
          "fixed top-0 left-0 bottom-0 z-[1000] w-80", 
          "bg-slate-50 bg-opacity-20 backdrop-blur ps-4 pe-1 pt-[100px]", 
          "shadow transition duration-300 ease-in-out",
          isOpenSidebar ? "translate-x-0" : "-translate-x-full"
        )
      }      
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 end-4 rounded-full"
        onClick={() => setIsOpenSidebar(false)}
      >
        <ArrowLeft size={24} />
      </Button>
      <div
        className={
          clsx(
            "custom-scrollbar",
            "h-[93%] mt-8"
          )
        }
      >
        <div className={
          clsx(
            "absolute top-[80px] h-[20px] left-0 right-0",
             "ms-4 me-[19px]",
          )
        }>
          <SearchPlace />
        </div>
        {searchLaps.length > 0 ?
          <SearchLaps searchLaps={ searchLaps } /> :
          (searchLaps.length === 0 && currentCity) &&
          <p className="text-center mt-5">Aucun parcours dans cette zone...</p>
        }
      </div>
    </aside>
  );
};

export default SideBar;