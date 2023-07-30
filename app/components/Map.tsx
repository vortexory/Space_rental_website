'use client';

import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import useCountries from '../hooks/useCountries';
import { locationType } from './modals/RentModal/RentModal';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  location: locationType | null;
}

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const Map = ({ location }: MapProps) => {
  const center = location?.latlng;

  return (
    <>
      <MapContainer
        center={(center as L.LatLngExpression) || [51, -0.09]}
        zoom={center ? 4 : 2}
        scrollWheelZoom={false}
        className="h-[35vh] rounded-lg"
      >
        <TileLayer url={url} />
        {center && <Marker position={center as L.LatLngExpression} />}
      </MapContainer>
    </>
  );
};

export default Map;
