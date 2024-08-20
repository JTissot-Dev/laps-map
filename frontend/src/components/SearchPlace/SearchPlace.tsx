import { useState } from "react";
import { Feature, Polygon } from "geojson";
import formatWktCoords from "@/utils/formatWktCoords";
import CustomSelect from "../ui/customSelect";
import { CityOptionSelect } from "@/types/optionsSelect";
import { useGetLapsCityLazyQuery } from "@/generated/graphql-types";
import { useStateContext } from "@/contexts/context";
import { useToast } from "../ui/use-toast";
import { Lap } from "@/generated/graphql-types";


const SearchPlace: React.FC = () => {

  const { 
    setSearchLaps,
    setCurrentCity } = useStateContext();
  const [cities, setCities] = useState<Feature[]>([]);
  const [getLapsCity] = useGetLapsCityLazyQuery();
  const { toast } = useToast();

  const handleSearchPlace = (value: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_GEO_GOUV_URL}/communes?nom=${value}&format=geojson&geometry=contour&limit=5`)
    .then((response) => {
      return response.json();
    })
    .then(({features}) => {
      setCities(features);
    })
    .catch((_error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la récupération des lieux",
        variant: "destructive"
      });
    });
  };

  const handleSearchLaps = (value: CityOptionSelect) => {
    if (!value) {
      setCurrentCity("");
      setSearchLaps([]);
      return;
    };

    setCurrentCity(value.label);
    const wktGeometry = formatWktCoords(value.geometry);
    getLapsCity({ 
      variables: { city: wktGeometry }, 
      onCompleted: (data) => {
        if (!data?.lapsByCity) return setSearchLaps([]);
        setSearchLaps(data.lapsByCity as Lap[]);
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Erreur lors de la récupération des parcours",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <CustomSelect 
      options={
        cities.map((city) => ({
          value: city.properties?.code,
          label: `${city.properties?.nom} (${city.properties?.code})`,
          geometry: city.geometry
        }))
      }
      isClearable={true}
      placeholder="Sélectionner un lieu..."
      noOptionsMessage={() => "Aucun résultat trouvé"}
      onInputChange={ (value: string) => handleSearchPlace(value) }
      onChange={(value) => handleSearchLaps(value as CityOptionSelect)}
    />
  );
};

export default SearchPlace;