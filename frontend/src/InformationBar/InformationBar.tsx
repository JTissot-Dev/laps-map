import { 
  Clock, 
  LineChart, 
  UserRound,
  MapPin } from "lucide-react";
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


const InformationBar = () => {

  const { currentLap } = useStateContext();

  return (
    <aside>
      <h2>{ currentLap.name }</h2>
      <img 
        src={ 
          currentLap.images && 
          currentLap.images.length > 0 && 
          currentLap.images[0].imgUrl !== null ? 
          currentLap.images[0].imgUrl :
           "images/default-lap.jpg"
        } 
        alt="lap image" 
      />
      <div className="flex">
        <Clock size={15} />
        <span>{ currentLap.duration }</span>
      </div>
      <div className="flex">
        <LineChart size={15} />
        <span>{ currentLap.difficulty.level }</span>
      </div>
      <div className="flex">
        <UserRound size={15} />
        <span>
          { `${currentLap.user.firstName} ${currentLap.user.lastName}` }
        </span>
      </div>
      <Button 
        variant="default"
      >
        <MapPin size={15} />
        <span>Aller au départ</span>
      </Button>
      <h3>Toutes les photos</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
    </aside>
  )
}