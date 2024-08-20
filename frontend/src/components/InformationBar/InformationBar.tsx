import { 
  Timer, 
  TrendingUp, 
  UserRound,
  MapPin,
  X } from "lucide-react";
import clsx from "clsx";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/contexts/context";
import { LapDetailProps } from "@/types/props";
import { Lap } from "@/generated/graphql-types";


const LapDetail: React.FC<LapDetailProps> = ({ detail, icon }) => {
  return (
    <div 
      className="flex items-center mb-1"
    >
      { icon }
      <span
        className=" font-normal text-md ms-2"
      >
        { detail }
      </span>
    </div>
  );
};

const InformationBar: React.FC = () => {
  
  const { currentLap, setCurrentLap } = useStateContext();
  if (!currentLap) return;
  return (
    <aside
      className={clsx(
        "fixed top-20 bottom-20 right-4",
        "w-[400px]",
        "bg-slate-50 bg-opacity-20 backdrop-blur shadow-lg",
        "p-7 pr-4 pb-16 rounded-md",
        "transition-transform duration-300",
        "transform translate-x-0",
        "z-[1000]"
      )}
    >
      <Button
        className={clsx(
          "absolute",
          "top-4 right-4",
          "w-5 h-5",
          "rounded-md",
          "hover:border hover:border-primary"
        )} 
        variant="ghost"
        size="icon"
        onClick={() => setCurrentLap({} as Lap)}
      >
        <X size={20} />
      </Button>
      <h2
        className="font-semibold text-lg"
      >
        { currentLap.name }
      </h2>
      <div
        className={clsx(
          "h-full -me-1.5 pe-1.5",
          "overflow-y-auto overflow-x-hidden custom-scrollbar"
        )}
      >
        <img 
          className="rounded-md my-4"
          src={ 
            currentLap.images && 
            currentLap.images.length > 0 && 
            currentLap.images[0].imgUrl !== null ? 
            currentLap.images[0].imgUrl :
            "images/default-lap.jpg"
          } 
          alt="lap image" 
        />
        <LapDetail 
          detail={ currentLap.duration ? currentLap.duration : "Durée inconnue" } 
          icon={<Timer size={18} strokeWidth={1.5}/>}
        />
        <LapDetail 
          detail={ currentLap.difficulty.level ? currentLap.difficulty.level : "Difficulté inconnue" } 
          icon={<TrendingUp size={18} strokeWidth={1.5} />}
        />
        <LapDetail 
          detail={ currentLap.user.email ? currentLap.user.email : "Utilisateur inconnu" } 
          icon={<UserRound size={18} strokeWidth={1.5} />}
        />
        <Button 
          className="my-4 w-full"
          variant="default"
        >
          <MapPin size={15} />
          <span
            className="ms-2"
          >
            Aller au départ
          </span>
        </Button>
        <h3
          className="font-normal text-md mt-4"
        >
          Toutes les photos
        </h3>
        <div 
          className="flex justify-center w-full mt-4"
        >
          <Carousel
            opts={{
              align: "center",
            }}
            className="w-[70%] max-w-sm"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </aside>
  );
};

export default InformationBar;