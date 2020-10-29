import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import mapStyles from './map.styles';

import styles from './Map.module.css';

const MyGoogleMap = withScriptjs<any>(
  withGoogleMap(function Map() {
    return (
      <GoogleMap
        defaultZoom={16.29}
        defaultCenter={{ lat: 46.9750078, lng: 7.4245647 }}
        options={{ styles: mapStyles }}
      >
        <Marker position={{ lat: 46.9750078, lng: 7.4247047 }} />
      </GoogleMap>
    );
  })
);

export const Map: React.FC = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setShow(true), 1000);
  }, []);

  if (!show) return <div key="bg" className={styles.map} />;
  return (
    <MyGoogleMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${__GOOGLE_MAPS_API_KEY__}`}
      loadingElement={<div key="bg" className={styles.map} />}
      containerElement={<div key="bg" className={styles.map} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};
