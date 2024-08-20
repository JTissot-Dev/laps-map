import { wktToGeoJSON } from "@terraformer/wkt";
import { 
  latLng,
  latLngBounds } from "leaflet";

const formatWktToBounds = ((wktGeom: string) => {
  const geoJsonGeom = wktToGeoJSON(wktGeom);

  if (geoJsonGeom.type === 'LineString') {

    const coordinatesStart = geoJsonGeom.coordinates[0],
    coordinatesEnd = geoJsonGeom.coordinates[geoJsonGeom.coordinates.length - 1];

    const corner1 = latLng(coordinatesStart[0], coordinatesStart[1]),
    corner2 = latLng(coordinatesEnd[0], coordinatesEnd[1]);

    return latLngBounds(corner1, corner2);
  }
})

export default formatWktToBounds;