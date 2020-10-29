import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';

import mapStyles from './map.styles';

import styles from './Map.module.css';

interface LocationPinProps {
  text: string;
  lat: number;
  lng: number;
}

const LocationPin: React.FC<LocationPinProps> = ({ text }) => (
  <div className={styles.pin}>
    <div className="grid grid-cols-2">
      <Icon icon={locationIcon} className={styles.pinIcon} />
      <p className={styles.pinText}>{text}</p>
    </div>
  </div>
);

export const Map: React.FC = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const location = {
    lat: 46.9750078,
    lng: 7.4247447,
    address: 'Kulturverein 3ab3',
  };

  return (
    <div className={styles.map}>
      {show && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: __GOOGLE_MAPS_API_KEY__ }}
          defaultZoom={16.29}
          defaultCenter={location}
          options={{ styles: mapStyles }}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      )}
    </div>
  );
};
