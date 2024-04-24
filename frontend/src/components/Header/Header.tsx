import { 
  AlignJustify, 
  UserRound, 
  UserRoundPlus } from "lucide-react";
  import clsx from "clsx";
import { Button } from "../ui/button";
import useDimensions from "@/hooks/useDimension";
import { useStateContext } from "@/contexts/context";


const Header: React.FC = () => {

  const { width } = useDimensions();
  const { 
    isOpenSidebar, 
    setIsOpenSidebar } = useStateContext();

  return (
    <header
      className={
        clsx(
          "fixed top-0 left-0 right-0 z-[1000]",
          "flex items-center p-4",
          isOpenSidebar ? "justify-end" : "justify-between"
        )
      }
    >
      { !isOpenSidebar &&
        <Button
          className="rounded-full shadow-xl"
          size="icon"
          onClick={() => setIsOpenSidebar(true)}
        >
          <AlignJustify size={20} />
        </Button>
      }
      <div>
        <Button 
          className={
            clsx(
              "rounded-full shadow-xl me-3", 
              width > 640 && "me-5"
            )
          }
          size={ width > 640 ? "default" : "icon" }
        >
          <UserRound 
            className={clsx(width > 640 && "mr-2")}
            size={20} 
          /> 
            { width > 640 &&
              <span>Se connecter</span>
            }
        </Button>
        <Button 
          className="rounded-full shadow-xl"
          size={ width > 640 ? "default" : "icon" }
        >
          <UserRoundPlus 
            className={clsx(width > 640 && "mr-2")}
            size={20} 
          /> 
            { width > 640 &&
              <span>S'inscrire</span>
            }
        </Button>
      </div>
    </header>
  )
};

export default Header;