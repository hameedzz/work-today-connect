
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: ${color}; width: 2rem; height: 2rem; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(0,0,0,0.2)"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    title: string;
    description?: string;
    type?: "job" | "worker" | "employer";
  }>;
  height?: string | number;
  onMarkerClick?: (index: number) => void;
  showCurrentLocation?: boolean;
}

// Component to handle map center changes
const ChangeMapCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

// Component to show current location
const CurrentLocation = () => {
  const map = useMap();
  
  useEffect(() => {
    const locateOptions = {
      flyTo: true,
      setView: true,
      maxZoom: 16,
      timeout: 10000,
      enableHighAccuracy: true,
    };
    
    map.locate(locateOptions);
    
    const onLocationFound = (e: L.LocationEvent) => {
      const radius = e.accuracy;
      
      L.marker(e.latlng, {
        icon: createCustomIcon("#4338ca"),
      })
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();
      
      L.circle(e.latlng, radius).addTo(map);
    };
    
    const onLocationError = () => {
      console.log("Location access denied");
    };
    
    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);
    
    return () => {
      map.off("locationfound", onLocationFound);
      map.off("locationerror", onLocationError);
    };
  }, [map]);
  
  return null;
};

const Map = ({
  center = [20.5937, 78.9629], // Default center of India
  zoom = 5,
  markers = [],
  height = "400px",
  onMarkerClick,
  showCurrentLocation = false,
}: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 0);
    }
  }, []);

  return (
    <div style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {center && <ChangeMapCenter center={center} />}
        
        {showCurrentLocation && <CurrentLocation />}
        
        {markers.map((marker, index) => {
          // Determine icon color based on marker type
          let iconColor = "#3B82F6"; // default blue
          if (marker.type === "job") iconColor = "#8B5CF6"; // worker purple
          if (marker.type === "worker") iconColor = "#4338CA"; // dark blue
          if (marker.type === "employer") iconColor = "#F97316"; // employer orange
          
          return (
            <Marker
              key={index}
              position={marker.position}
              icon={createCustomIcon(iconColor)}
              eventHandlers={{
                click: () => onMarkerClick && onMarkerClick(index),
              }}
            >
              <Popup>
                <strong>{marker.title}</strong>
                {marker.description && <p>{marker.description}</p>}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
