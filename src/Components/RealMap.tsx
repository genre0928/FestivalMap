import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { Iitems } from "../api";
import L from "leaflet";
function RealMap({
  data,
  hoveredFstName,
}: {
  data: Iitems[];
  hoveredFstName: string | null;
}) {
  if (!data) return;
  return (
    <MapContainer
      center={[36.5, 127.5]}
      maxBounds={L.latLngBounds([32.5, 123.5], [39.0, 132.0])}
      zoom={8}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {data.map((item, index) => {
        const lat = parseFloat(item.latitude);
        const lon = parseFloat(item.longitude);
        const isHover = hoveredFstName === item.fstvlNm;
        if (!lat || !lon) return;
        return (
          <Marker
            key={index}
            position={[lat, lon]}
            icon={L.icon({
              iconUrl: isHover
                ? "https://cdn-icons-png.flaticon.com/128/14035/14035451.png"
                : "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize: isHover ? [30, 30] : [20, 20],
            })}
          />
        );
      })}
    </MapContainer>
  );
}

export default RealMap;
