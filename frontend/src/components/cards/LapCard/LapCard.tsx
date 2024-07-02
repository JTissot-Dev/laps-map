import clsx from "clsx";
import { LineChart } from "lucide-react";
import { Lap } from "@/generated/graphql-types";


const LapCard: React.FC<{ lap: Lap }> = ({ lap }) => {

  const imageSrc = lap.images?.length && lap.images.length > 0 && lap.images[0].imgUrl;

  return (
    <button
      className={
        clsx(
          "flex items-start",
          "p-2 w-full rounded-md",
          "border border-[#e5e7eb]",
          "bg-[#FFFFFF] shadow-sm box-content",
          "hover:border-[#252D3E]",
          "text-start"
        )
      }
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
        <h3 className="font-semibold">{lap.name}</h3>
        <div 
          className="flex items-center mt-1"
        >
          <LineChart size={15} />
          <p className="text-sm ms-1 -mb-1">{lap.difficulty.level}</p>
        </div>
        
      </div>
    </button>
  );
};

export default LapCard;