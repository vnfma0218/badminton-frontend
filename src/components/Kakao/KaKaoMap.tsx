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
  onChangeAddress: (addrInfo: { loadAddress?: string; jibun?: string }) => void;
}
const KaKaoMap = ({ onChangeAddress }: IKaKaoMap) => {
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>();
  const [position, setPosition] = useState<{ lat: number; lng: number }>();

  useEffect(() => {
    const getUserLocation = async () => {
      setLoading(true);
      const result = await getLocation();

      setUserLocation({
        lat: !result.latitude ? 33.5563 : result.latitude,
        lng: !result.longitude ? 126.79581 : result.longitude,
      });
      setLoading(false);
    };
    getUserLocation();
  }, []);

  return (
    <>
      {!loading ? (
        <Map
          center={{ lat: userLocation?.lat!, lng: userLocation?.lng! }}
          style={{ width: '100%', height: '360px' }}
          onClick={(_t, mouseEvent) => {
            const geocoder = new kakao.maps.services.Geocoder();
            const lat = mouseEvent.latLng.getLat();
            const lng = mouseEvent.latLng.getLng();
            setPosition({
              lat,
              lng,
            });
            geocoder.coord2Address(lng, lat, (result, status) => {
              console.log(result);
              const loadAddress = result[0].road_address?.address_name;
              const jibun = result[0].address?.address_name;
              console.log(status);
              onChangeAddress({ loadAddress, jibun });
            });
          }}
        >
          {position && <MapMarker position={position} />}
        </Map>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default KaKaoMap;
