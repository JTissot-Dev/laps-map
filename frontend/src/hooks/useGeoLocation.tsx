import { useState, useEffect } from "react";
import { LatLngExpression } from "leaflet";


const useGeoLocation = () => {

  const [geoLocation, setGeoLocation] = useState<LatLngExpression>([45.749308, 4.909850]);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, [])

  return { geoLocation: geoLocation };
}

export default useGeoLocation