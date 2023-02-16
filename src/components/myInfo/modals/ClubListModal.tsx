import KaKaoMap, { AddressInfo } from '@/components/Kakao/KaKaoMap';
import { getNearClubList } from '@/lib/api/club';
import { Club } from '@/lib/types';
import { getLocation } from '@/lib/util/functions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  mapState,
  resetUserPosState,
  updateMapPosState,
  updateUserPosState,
} from '@/store/slices/mapSlice';
import { useEffect, useRef, useState } from 'react';
import PostClubModal from './PostClubModal';
import SearchClubListModal from './SearchClubListModal';

interface ClubListModalProps {
  onCancelModal: () => void;
}

const ClubListModal = ({ onCancelModal }: ClubListModalProps) => {
  // const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
  //   lat: 33.5563,
  //   lng: 126.79581,
  // });
  const dispatch = useAppDispatch();
  const { userPosition, mapPosition } = useAppSelector(mapState);

  const postModalRef = useRef(null);
  const searchModalRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [clubList, setClubList] = useState<Club[]>([]);
  const [clickedPosition, setClickedPosition] = useState<AddressInfo>();
  const [centerPosition, setCenterPosition] = useState<{ lat: number; lng: number }>();
  const [resetClickedPosition, setResetClickedPosition] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const getUserLocation = async () => {
      const result = await getLocation();

      dispatch(
        updateUserPosState({
          lat: result.latitude,
          lng: result.longitude,
        }),
      );

      dispatch(
        updateMapPosState({
          lat: result.latitude,
          lng: result.longitude,
        }),
      );
    };

    if (!userPosition.lat) {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    console.log(userPosition);
    if (userPosition.lat) {
      fetchNearClubList();
    }
  }, [userPosition]);

  useEffect(() => {
    if (showSearchModal) {
      (searchModalRef.current as any).click();
    }
  }, [showSearchModal]);

  const onClickMap = (addrInfo: AddressInfo) => {
    setClickedPosition({
      loadAddress: addrInfo.loadAddress ?? '',
      jibun: addrInfo.jibun ?? '',
      lat: addrInfo.lat,
      lng: addrInfo.lng,
    });
  };

  // const onChangeMapCenter = async ({
  //   coordinates,
  //   firstFlag,
  // }: {
  //   coordinates: [number, number];
  //   firstFlag?: boolean;
  // }) => {
  //   const [lat, lng] = coordinates;
  //   setCenterPosition({ lat, lng });
  //   if (coordinates.length && firstFlag) {
  //     console.log('first search');
  //     fetchNearClubList(lat, lng);
  //   }
  // };

  const fetchNearClubList = async () => {
    const clubList = await getNearClubList({
      lat: mapPosition.lat!,
      lng: mapPosition.lng!,
    });
    setClubList(clubList);
  };

  const onClickPostClub = () => {
    (postModalRef.current as any).click();
  };

  const onPostSuccessPostCb = () => {
    fetchNearClubList();
    setResetClickedPosition(true);
    setResetClickedPosition(false);
  };

  const resetUserPosition = () => {
    dispatch(
      updateMapPosState({
        lat: userPosition.lat!,
        lng: userPosition.lng!,
      }),
    ),
      fetchNearClubList();
    dispatch(resetUserPosState());
  };

  const onShowSearchModal = () => {
    setShowSearchModal(true);
  };

  const onClickClub = (name: string, lat: number, lng: number) => {
    dispatch(
      updateUserPosState({
        lat,
        lng,
      }),
    );
    // setUserLocation({ lat: lat, lng: lng });
    setClubList([
      {
        _id: '',
        name,
        address: { jibun: '', loadAddress: '' },
        location: { coordinates: [lng, lat] },
      },
    ]);
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
              onClick={onShowSearchModal}
              // disabled
            />
          </div>

          <p>지번:{clickedPosition?.jibun}</p>
          <p>도로명주소: {clickedPosition?.loadAddress}</p>
          <KaKaoMap
            // userLocation={userLocation}
            onClickMap={onClickMap}
            // onChangeMapCenter={onChangeMapCenter}
            clubList={clubList}
            onClickPostClub={onClickPostClub}
          />
          {userPosition.lat ? (
            <div>
              <button
                onClick={() => fetchNearClubList()}
                className='btn absolute px-6 text-xs bg-black text-white border-white bottom-20 left-[35%] z-10'
              >
                현위치에서 재검색
              </button>
              <button
                onClick={resetUserPosition}
                className='btn btn-primary absolute text-xs z-10 bottom-20'
              >
                내위치
              </button>
            </div>
          ) : null}

          <div className='modal-action'>
            <label htmlFor='map-modal' className='btn' onClick={onCancelModal}>
              취소
            </label>
            <label htmlFor='post-club-modal' ref={postModalRef} className='btn'>
              확인
            </label>
          </div>
        </div>
      </div>
      {clickedPosition ? (
        <PostClubModal addrInfo={clickedPosition} onSuccessPostCb={onPostSuccessPostCb} />
      ) : null}

      {showSearchModal ? (
        <SearchClubListModal
          onCancelSearchModal={() => {
            setShowSearchModal(false);
          }}
          onClickClub={onClickClub}
        />
      ) : null}
      <label htmlFor='search-club-modal' ref={searchModalRef} />
    </>
  );
};

export default ClubListModal;
