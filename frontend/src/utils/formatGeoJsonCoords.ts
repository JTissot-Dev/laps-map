import { Position } from "geojson";
import { wktToGeoJSON } from "@terraformer/wkt";

const formatGeoJsonCoords = (wktGeom: string) => {
  const geoJsonGeom = wktToGeoJSON(wktGeom);

  if (geoJsonGeom.type === 'LineString') {
    return {
      ...geoJsonGeom,
      coordinates: geoJsonGeom.coordinates.map((coord: Position): Position => {
        return [coord[1], coord[0]];
      })
    };
  };
};

export default formatGeoJsonCoords;