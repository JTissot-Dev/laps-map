import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";


const Map: React.FC = () => {
  return (
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={13} 
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
      zoomControl={ false }
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
    </MapContainer>
  )
}

export default Map;