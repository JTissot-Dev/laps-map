import { Lap } from "@/generated/graphql-types";
import LapCard from "../cards/LapCard/LapCard";


const SearchLaps: React.FC<{searchLaps : Lap[]}> = ({ searchLaps }) => {
  
  return (
    <ul className="-mt-2 me-1.5 pe-4">
      {searchLaps.map((lap) => (
        <li 
          className="my-2"
          key={lap.id}
        >
          <LapCard lap={lap} />
        </li>
      ))}
    </ul>
  )
};

export default SearchLaps;