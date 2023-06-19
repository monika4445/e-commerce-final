import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  height: '30vh',
  width: '30%',
};

const center = {
  lat: 40.1772,
  lng: 44.50349,
};

const CustomMarker: React.FC = () => {
  const [scaledSize, setScaledSize] = useState<google.maps.Size | null>(null);

  useEffect(() => {
    const size = new window.google.maps.Size(50, 50);
    setScaledSize(size);
  }, []);

  if (!window.google) {
    console.log('Google Maps API not loaded');
    return null;
  }

  return scaledSize ? (
    <Marker
      position={{ lat: 59.955413, lng: 30.337844 }}
      icon={{
        url: 'https://thumbs.dreamstime.com/b/red-maps-pin-location-map-icon-location-pin-pin-icon-vector-red-maps-pin-location-map-icon-location-pin-pin-icon-vector-vector-140200096.jpg',
        scaledSize: scaledSize,
      }}
    />
  ) : (
    <div>Loading...</div>
  );
};

const SimpleMap: React.FC = () => {
  useEffect(() => {
    console.log('Google Maps API loaded');
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDZb1l_T9KhCePjkpl9YhaubBsjFha0sC8"
      onLoad={() => console.log('Google Maps API script loaded')}
      onError={() => console.log('Error loading Google Maps API script')}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={(map) => console.log('Map loaded', map)}
        onUnmount={(map) => console.log('Map unmounted', map)}
      >
        <CustomMarker />
      </GoogleMap>
    </LoadScript>
  );
};

export default SimpleMap;
