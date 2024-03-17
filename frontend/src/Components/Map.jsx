import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { UseCitiesContext } from "../Contexts/CitiesContext";
import { useGeolocation } from "../Hooks/UseGeoLocation";
import Button from "./Button";
import UseUrlPosition from "../Hooks/UseUrlPosition";
export default function Map() {
  const { cities, flagemojiToPNG, cityName, country } = UseCitiesContext();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const navigate = useNavigate();

  const [mapLat, mapLng] = UseUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
        navigate(
          `form?lat=${geoLocationPosition.lat}&lng=${geoLocationPosition.lng}`
        );
      }
    },
    [geoLocationPosition]
  );

  return (
    <>
      <div className={styles.mapContainer}>
        {
          <Button type='position' onClick={getPosition}>
            {isLoadingPosition ? "Loading" : "Use your position"}
          </Button>
        }
        <MapContainer
          // center={mapPosition}
          center={mapLat && mapLng ? [mapLat, mapLng] : mapPosition}
          zoom={9}
          scrollWheelZoom={true}
          className={styles.map}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          />
          {cities?.map((city) => (
            <React.Fragment key={city._id}>
              <Marker position={[city.position.lat, city.position.lng]}>
                <Popup>
                  <span>{city.emoji ? flagemojiToPNG(city.emoji) : ""}</span>
                  <span>{city.cityName}</span>
                </Popup>
              </Marker>
              {cityName && (
                <Marker position={mapPosition}>
                  <Popup>
                    {cityName}, {country}
                  </Popup>
                </Marker>
              )}
            </React.Fragment>
          ))}
          <ChangeCenter position={mapPosition} />
          <DetectClick />
        </MapContainer>
      </div>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
