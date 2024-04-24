import { LatLng } from "leaflet"


const stringifyCoords = (coords: LatLng) => {
  return `${coords.lat} ${coords.lng}`;
};

export default stringifyCoords;