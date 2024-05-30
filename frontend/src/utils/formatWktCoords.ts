import { Position, Geometry } from "geojson";
import { geojsonToWKT } from "@terraformer/wkt";

const formatWktCoords = (geojsonGeom: Geometry) => {

  switch (geojsonGeom.type) {
    case 'LineString':
      const reverseGeom = {
        ...geojsonGeom,
        coordinates: geojsonGeom.coordinates.map((coord: Position): Position => {
          return [coord[1], coord[0]];
        })
      };
      return geojsonToWKT(reverseGeom);
    case 'Polygon':
      const reversePolygon = {
        ...geojsonGeom,
        coordinates: geojsonGeom.coordinates.map((coords: Position[]): Position[] => {
          return coords.map((coord: Position): Position => {
            return [coord[1], coord[0]];
          });
        })
      };
      return geojsonToWKT(reversePolygon);
    default:
      return "";
  } 
};

export default formatWktCoords;