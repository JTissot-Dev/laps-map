import { useEffect } from "react";
import { MapContainer, useMapEvents, useMap } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { useStateContext } from "@/contexts/context";
import stringifyCoords from "@/utils/stringifyCoords";
import LapLayer from "../layers/LapLayer/LapLayer";
import useGeoLocation from "@/hooks/useGeoLocation";


const MapHandler: React.FC = () => {
  const map = useMap();
  const { setCanvas } = useStateContext();
  const { geoLocation } = useGeoLocation();

  useEffect(() => {
    map.setView(geoLocation, 13);
    setCanvas({
      northEst: stringifyCoords(map.getBounds().getNorthEast()),
      northWest: stringifyCoords(map.getBounds().getNorthWest()),
      southEst: stringifyCoords(map.getBounds().getSouthEast()),
      southWest: stringifyCoords(map.getBounds().getSouthWest())
    });
  }, [geoLocation]);

  useMapEvents({
    zoomend: () => {
      setCanvas({
        northEst: stringifyCoords(map.getBounds().getNorthEast()),
        northWest: stringifyCoords(map.getBounds().getNorthWest()),
        southEst: stringifyCoords(map.getBounds().getSouthEast()),
        southWest: stringifyCoords(map.getBounds().getSouthWest())
      });
    },
    moveend: () => {
      setCanvas({
        northEst: stringifyCoords(map.getBounds().getNorthEast()),
        northWest: stringifyCoords(map.getBounds().getNorthWest()),
        southEst: stringifyCoords(map.getBounds().getSouthEast()),
        southWest: stringifyCoords(map.getBounds().getSouthWest())
      });
    }
  });

  return null;
};


const Map: React.FC = () => {


  return (
    <MapContainer 
      center={[45.749308, 4.909850]} 
      zoom={13} 
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
      zoomControl={ false }
    >
      <MapHandler />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <LapLayer />
    </MapContainer>
  )
}

export default Map;