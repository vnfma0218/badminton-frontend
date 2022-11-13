import { getLocation } from '@/lib/util/functions';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

declare global {
  interface Window {
    kakao: any;
  }
}

interface IKaKaoMap {
  onShowAddr?: (addrInfo: { load: string; jibun: string }) => void;
}
const KaKaoMap = ({ onShowAddr }: IKaKaoMap) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>();
  const [position, setPosition] = useState<{ lat: number; lng: number }>();
  const [clubAddr, setClubAddr] = useState({ load: '', jibun: '' });

  useEffect(() => {
    const getUserLocation = async () => {
      const result = await getLocation();

      setUserLocation({ lat: result.latitude, lng: result.longitude });
    };
    getUserLocation();
  }, []);

  return (
    <Map
      center={{ lat: userLocation?.lat ?? 33.5563, lng: userLocation?.lng ?? 126.79581 }}
      style={{ width: '100%', height: '360px' }}
      level={3} // 지도의 확대 레벨
      onClick={(_t, mouseEvent) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        let coord = new window.kakao.maps.LatLng(
          mouseEvent.latLng.getLat(),
          mouseEvent.latLng.getLng(),
        );
        const cb = (result: any, status: any) => {
          console.log(status);
          if (status === 'OK') {
            onShowAddr({
              jibun: result[0].address.address_name,
              load: result[0].road_address?.address_name,
            });
            setClubAddr({
              jibun: result[0].address.address_name,
              load: result[0].road_address?.address_name,
            });
          }
        };

        geocoder.coord2Address(coord.getLng(), coord.getLat(), cb);
        setPosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        });
      }}
    >
      {position && <MapMarker position={position} />}
    </Map>
  );
};

export default KaKaoMap;
