import { Club } from '@/lib/types';
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
  userLocation: { lat: number; lng: number };
  onClickMap: (addrInfo: AddressInfo) => void;
  onChangeMapCenter: ({
    coordinates,
    firstFlag,
  }: {
    coordinates: [number, number];
    firstFlag?: boolean;
  }) => void;
  clubList: Club[];
  onClickPostClub: () => void;
  resetClickedPosition: boolean;
}
const KaKaoMap = ({
  userLocation,
  onClickMap,
  onChangeMapCenter,
  onClickPostClub,
  clubList,
  resetClickedPosition,
}: IKaKaoMap) => {
  const [loading, setLoading] = useState(false);
  // const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>();
  const [position, setPosition] = useState<{ lat: number; lng: number }>();

  useEffect(() => {
    const getUserLocation = async () => {
      setLoading(true);
      // const result = await getLocation();
      // onChangeMapCenter({
      //   coordinates: [
      //     !result.latitude ? 33.5563 : result.latitude,
      //     !result.longitude ? 126.79581 : result.longitude,
      //   ],
      //   firstFlag: true,
      // });

      // setUserLocation({
      //   lat: !result.latitude ? 33.5563 : result.latitude,
      //   lng: !result.longitude ? 126.79581 : result.longitude,
      // });
      setLoading(false);
    };
    getUserLocation();
  }, []);

  useEffect(() => {
    if (resetClickedPosition) {
      setPosition(undefined);
    }
  }, [resetClickedPosition]);

  return (
    <>
      {!loading ? (
        <Map
          center={{ lat: userLocation?.lat!, lng: userLocation?.lng! }}
          level={5}
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
              onClickMap({ loadAddress, jibun, lat, lng });
            });
          }}
          onCenterChanged={(map) => {
            onChangeMapCenter({
              coordinates: [map.getCenter().getLat(), map.getCenter().getLng()],
              firstFlag: false,
            });
          }}
        >
          {position ? (
            <MapMarker position={position}>
              <div style={{ padding: '5px' }} className='flex'>
                <p style={{ fontSize: '12px' }} className=''>
                  이 위치에 클럽 등록
                </p>
                <span onClick={onClickPostClub} className='material-icons'>
                  arrow_right_alt
                </span>
              </div>
            </MapMarker>
          ) : null}
          {clubList?.map((club) => {
            const position = {
              lat: club.location.coordinates[1],
              lng: club.location.coordinates[0],
            };
            return (
              <MapMarker key={club._id} position={position}>
                <div style={{ padding: '5px' }}>{club.name}</div>
              </MapMarker>
            );
          })}
        </Map>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default KaKaoMap;
