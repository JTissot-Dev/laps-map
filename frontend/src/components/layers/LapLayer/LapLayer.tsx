import { useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import { Feature, Geometry } from 'geojson';
import { Lap } from "@/generated/graphql-types";
import { useGetLapsLazyQuery } from "@/generated/graphql-types";
import { useStateContext } from "@/contexts/context";
import formatGeoJsonCoords from "@/utils/formatGeoJsonCoords";


const LapLayer = () => {

  const { canvas } = useStateContext();
  const [getLaps, { data }] = useGetLapsLazyQuery();

  useEffect(() => {
    if (canvas) {
      getLaps({ variables: { canvas: canvas} });
    }
  }, [canvas]);

  return (
    <>
      {(data && data.laps) && data.laps.map((lap: Lap) => {
        const geometry = formatGeoJsonCoords(lap.geometry) as Geometry;

        const geoJsonData: Feature = {
          type: "Feature",
          geometry: geometry,
          properties: {}
        };

        return (
          <GeoJSON
            key={lap.id}
            data={geoJsonData}
            style={() => ({
              color: "#a83636",
              weight: 2,
            })}
          />
        );
      })}
    </>
  )
};

export default LapLayer;