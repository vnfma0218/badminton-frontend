import { useState } from 'react';
import KaKaoMap from '../Kakao/KaKaoMap';

const MapModal = () => {
  const [position, setPosition] = useState<{ loadAddress: string; jibun: string }>();

  const onChangeAddress = (addrInfo: { loadAddress?: string; jibun?: string }) => {
    setPosition({ loadAddress: addrInfo.loadAddress ?? '', jibun: addrInfo.jibun ?? '' });
  };
  return (
    <>
      <input type='checkbox' id='map-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <div className='flex items-center'>
            <h3 className='font-bold text-lg mr-3'>클럽찾기</h3>
            <input
              type='text'
              className='input input-primary h-5 text-xs'
              placeholder='클럽명 검색'
            />
          </div>

          <p>지번:{position?.jibun}</p>
          <p>도로명주소: {position?.loadAddress}</p>
          <KaKaoMap onChangeAddress={onChangeAddress} />
          <div className='modal-action'>
            <label htmlFor='map-modal' className='btn'>
              취소
            </label>
            <label htmlFor='map-modal' className='btn'>
              확인
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapModal;
