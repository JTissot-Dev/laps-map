import clsx from "clsx";
import { TrendingUp, Timer } from "lucide-react";
import { 
  Lap,
  useLapByIdLazyQuery } from "@/generated/graphql-types";
import { useStateContext } from "@/contexts/context";
import { useToast } from "@/components/ui/use-toast";
import { useMap } from "react-leaflet";
import formatWktToBounds from "@/utils/formatWktToBounds";
import { format } from 'date-fns';


const LapCard: React.FC<{ lap: Lap }> = ({ lap }) => {

  const map = useMap();
  const { currentLap, setCurrentLap } = useStateContext();
  const { toast } = useToast();
  const imageSrc = lap.images?.length && lap.images.length > 0 && lap.images[0].imgUrl;
  const [ getLapById ] = useLapByIdLazyQuery();

  const formattedDate = format(new Date(lap.createdAt), 'dd-MM-yyyy');

  const handleGetLapDetails = () => {
    getLapById({ 
      variables: { id: Number(lap.id) }, 
      onCompleted: ({ lapById }) => {
        setCurrentLap(lapById as Lap);
        const lapBounds = formatWktToBounds(lapById?.geometry);
        if (!lapBounds) return;
        map.fitBounds(lapBounds, { maxZoom: 15 });
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Erreur lors de la récupération du parcours",
          variant: "destructive"
        });
      }
    });
  }

  return (
    <button
      className={
        clsx(
          "flex relative",
          "p-2 w-full rounded-md",
          "border border-[#e5e7eb]",
          "bg-[#FFFFFF] shadow-sm box-content",
          "hover:border-primary",
          "transition duration-200 ease-in-out",
          "text-start",
          currentLap.id === lap.id && "border-primary"
        )
      }
      onClick={handleGetLapDetails}
    >
      <img
        className={
          clsx(
            "w-[100px] h-[80px]",
            "rounded-md"
          )
        }
        src={ imageSrc || "images/default-lap.jpg" }
        
        alt="lap image"
      ></img>
      <div
        className="ms-2"
      > 
        <h3 
          className="font-normal text-[14px]"
          title={ lap.name }
        >
            { lap.name }
        </h3>
        <div 
          className="flex items-center mt-1"
        >
          <TrendingUp size={15} />
          <span className="text-sm text-[12px] ms-1">
            { lap.difficulty.level }
          </span>
        </div>
        <div 
          className="flex items-center"
        >
          <Timer className="mb-[2px]" size={15} />
          <span className="text-sm text-[12px] ms-1">
            { lap.duration }
          </span>
        </div>
      </div>
      <span 
        className="absolute bottom-2 end-2 text-xs text-gray-500"
      >
          { formattedDate }
      </span>
    </button>
  );
};

export default LapCard;