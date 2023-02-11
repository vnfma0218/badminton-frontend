import KaKaoMap from '../Kakao/KaKaoMap';

const MapModal = () => {
  return (
    <>
      <input type='checkbox' id='map-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>클럽찾기</h3>
          <KaKaoMap />
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
