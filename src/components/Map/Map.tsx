import Script from 'next/script';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}
const Map = () => {
  const containerRef = useRef<HTMLDivElement>(null); // 지도 ref
  //map불러오기
  const initMap = useCallback(() => {
    console.log('load');
    if (containerRef.current) {
      console.log(containerRef.current);
      const map = new window.kakao.maps.Map(containerRef.current, {
        center: new window.kakao.maps.LatLng(37.5173319258532, 127.047377408384),
        level: 3,
      });
    }
  }, []);
  useEffect(() => {
    if (window?.kakao) {
      initMap();
    }
  }, [initMap]);
  return (
    <React.Fragment>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
      <div
        id='map'
        ref={containerRef}
        style={{
          width: '500px',
          height: '400px',
        }}
      ></div>
    </React.Fragment>
  );
};

export default Map;
