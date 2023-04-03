import React, { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

declare global {
  interface Window {
    kakao: any;
  }
}

interface IPostLocationMap {
  onCloseModal: () => void;
}
const PostLocationMap = ({ onCloseModal }: IPostLocationMap) => {
  const [center, setCenter] = useState({
    lat: 33.452613,
    lng: 126.570888,
  });
  return (
    <>
      <div className='fixed z-50 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div
          onClick={onCloseModal}
          className='absolute top-4 left-4 text-xl p-4 bg-white rounded-full border z-50 w-10 h-10 flex items-center justify-center text-gray-500'
        >
          X
        </div>
        <Map
          center={center}
          level={5}
          isPanto={true}
          style={{ width: '100%', height: '100%' }}
        ></Map>
      </div>
    </>
  );
};

export default PostLocationMap;
