import { getLocation } from '@/lib/util/functions';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Loading from '../UIElement/Loading';

declare global {
  interface Window {
    kakao: any;
  }
}

export type AddressInfo = {
  loadAddress?: string;
  jibun?: string;
  lat: number;
  lng: number;
};

interface IKaKaoMap {
  onChangeAddress: (addrInfo: AddressInfo) => void;
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
              const loadAddress = result[0].road_address?.address_name;
              const jibun = result[0].address?.address_name;
              onChangeAddress({ loadAddress, jibun, lat, lng });
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
