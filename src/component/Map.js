import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import CurrentLocation from "./CurrentLocation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const icon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/684/684908.png',
  iconSize: [38, 38],
});
const position = [21.146633, 79.08886];

function ResetCenterViwe(props) {
  const { location } = props;
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView(L.latLng(location?.lat, location?.lon), map.getZoom(), {
        animate: true,
      });
    }
  }, [location]);

  return null;
}

const Map = (props) => {
  const { location } = props;
  const locationSelection = [location?.lat, location?.lon];
  const userPlace = CurrentLocation();
  const mapRef = useRef();

  return (
    <>
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=x7qY8C2t9lFFEzK67Ap0"
        />
        {userPlace.loaded && !userPlace.error && (
          <Marker
            position={[userPlace.coordinates.lat, userPlace.coordinates.lng]}
            icon={icon}
          >
          </Marker>
        )}

        {location && (
          <Marker position={locationSelection} icon={icon}>
          </Marker>
        )}
        <ResetCenterViwe location={location} />
      </MapContainer>
    </>
  );
};

export default Map;
