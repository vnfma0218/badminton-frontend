import { Club } from '@/lib/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { mapState, updateMapPosState } from '@/store/slices/mapSlice';
import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

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
  onClickMap: (addrInfo: AddressInfo) => void;

  clubList: Club[];
  onClickPostClub?: () => void;
}
const KaKaoMap = ({ onClickMap, onClickPostClub, clubList }: IKaKaoMap) => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const dispatch = useAppDispatch();
  const { mapPosition } = useAppSelector(mapState);
  const [center, setCenter] = useState({
    lat: 33.452613,
    lng: 126.570888,
  });
  const [position, setPosition] = useState<{ lat: number; lng: number }>();

  useEffect(() => {
    if (mapPosition.lat && mapPosition.lng) {
      setCenter({ lat: mapPosition.lat, lng: mapPosition.lng });
    }
  }, [mapPosition]);

  return (
    <>
      <Map
        center={center}
        onCreate={(map) => {
          setMap(map);
        }}
        level={5}
        isPanto={true}
        style={{ width: '100%', height: '100%' }}
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
        onDragEnd={(map) => {
          dispatch(
            updateMapPosState({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            }),
          );
          setCenter({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          });
        }}
        onCenterChanged={(map) => {}}
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
    </>
  );
};

export default KaKaoMap;
