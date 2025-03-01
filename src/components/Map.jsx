/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesProvider";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocation";

import { useUrlLocation } from "../hooks/useUrlLocation";

function Map() {
  const [position, setPosition] = useState([
    38.727881642324164, -9.140900099907554,
  ]);

  //custom hook
  const {
    isLoading: isLoadingPostion,
    position: positionGeolocation,
    getPosition,
  } = useGeolocation();

  //custom hook
  const [lat, lng] = useUrlLocation();

  const { cities } = useCities();

  //for update postion based on intreactive user with map
  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  //for update postion based on postionGeoLocation of the gps user when seet his location
  useEffect(() => {
    if (positionGeolocation)
      setPosition([positionGeolocation.lat, positionGeolocation.lng]);
  }, [positionGeolocation]);

  return (
    <div className={styles.mapContainer}>
      {!positionGeolocation && (
        <Button
          type="position"
          onClickEvent={(e) => {
            e.preventDefault();
            getPosition();
          }}
        >
          {isLoadingPostion ? "is loding ..." : "set your Postion"}
        </Button>
      )}

      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWhhbWFuaTAiLCJhIjoiY20yZ2xraHo3MDJzeDJrc2M5am0zbmZkbCJ9.3o_D0Z2Srck8buylxZgK7g"
        />
        {cities &&
          cities.map((city) => (
            <Marker key={city.id} position={city.position}>
              <Popup>
                {city.cityName} , {city.country}
              </Popup>
            </Marker>
          ))}

        <ChangeCenter postion={position} />

        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ postion }) {
  const map = useMap();
  map.setView(postion);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (event) =>
      navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
  });
}

export default Map;
