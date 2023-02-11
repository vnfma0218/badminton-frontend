import { getLocation } from '@/lib/util/functions';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Loading from '../UIElement/Loading';

declare global {
  interface Window {
    kakao: any;
  }
}

interface IKaKaoMap {
  onShowAddr?: (addrInfo: { load: string; jibun: string }) => void;
}
const KaKaoMap = ({ onShowAddr }: IKaKaoMap) => {
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>();
  const [position, setPosition] = useState<{ lat: number; lng: number }>();
  const [clubAddr, setClubAddr] = useState({ load: '', jibun: '' });

  useEffect(() => {
    const getUserLocation = async () => {
      setLoading(true);
      const result = await getLocation();

      setUserLocation({
        lat: !result.latitude ? 33.5563 : result.latitude,
        lng: !result.longitude ? 126.79581 : result.longitude,
      });
      setLoading(false);
      console.log(result.latitude, result.longitude);
    };
    getUserLocation();
  }, []);

  return (
    <>
      {!loading ? (
        <Map
          center={{ lat: userLocation?.lat!, lng: userLocation?.lng! }}
          style={{ width: '100%', height: '360px' }}
        >
          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
            <div style={{ color: '#000' }}>Hello World!</div>
          </MapMarker>
        </Map>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default KaKaoMap;
