import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useStateContext } from "@/contexts/context";
import Select from 'react-select';


const SideBar: React.FC = () => {

  const { isOpenSidebar, setIsOpenSidebar } = useStateContext();

  return (
    <aside
      className={
        clsx(
          "fixed top-0 left-0 bottom-0 z-[1000] w-80", 
          "bg-slate-50 bg-opacity-20 backdrop-blur p-4", 
          "shadow transition duration-300 ease-in-out",
          isOpenSidebar ? "translate-x-0" : "-translate-x-full"
        )
      }      
    >
      <Button
        variant="ghost"
        size="icon"
        className="float-end rounded-full"
        onClick={() => setIsOpenSidebar(false)}
      >
        <ArrowLeft size={24} />
      </Button>
      <Select 
        isClearable={true}
        placeholder="Sélectionner un lieu..."
        noOptionsMessage={() => "Aucun résultat trouvé"}
        className="mt-20"
        theme={(theme) => ({
          ...theme,
          boxShadow: 'none',
          colors: {
            ...theme.colors,
            primary25: '#999999',
            primary: '#242b3c',
          },
        })}
      />
    </aside>
  );
};

export default SideBar;