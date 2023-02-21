import { BiCurrentLocation } from 'react-icons/bi';
import { IconContext } from 'react-icons';

import KaKaoMap, { AddressInfo } from '@/components/Kakao/KaKaoMap';
import Loading from '@/components/UIElement/Loading';
import { getNearClubList } from '@/lib/api/club';
import { Club } from '@/lib/types';
import { getLocation } from '@/lib/util/functions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { mapState, updateMapPosState } from '@/store/slices/mapSlice';
import { useEffect, useRef, useState } from 'react';
import PostClubModal from './PostClubModal';
import SearchClubListModal from './SearchClubListModal';

interface ClubListModalProps {
  onCancelModal: () => void;
}

const ClubListModal = ({ onCancelModal }: ClubListModalProps) => {
  const dispatch = useAppDispatch();
  const { mapPosition } = useAppSelector(mapState);

  const postModalRef = useRef(null);
  const searchModalRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [clubList, setClubList] = useState<Club[]>([]);
  const [clickedPosition, setClickedPosition] = useState<AddressInfo>();
  const [showSearchModal, setShowSearchModal] = useState(false);

  const getUserLocation = async () => {
    setLoading(true);
    const result = await getLocation();

    dispatch(
      updateMapPosState({
        lat: result.latitude,
        lng: result.longitude,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    if (!mapPosition.lat) {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    if (mapPosition.lat) {
      fetchNearClubList();
    }
  }, [mapPosition]);

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
  };

  const resetUserPosition = () => {
    getUserLocation();
  };

  const onShowSearchModal = () => {
    setShowSearchModal(true);
  };

  const onClickClub = (name: string, lat: number, lng: number) => {
    dispatch(
      updateMapPosState({
        lat,
        lng,
      }),
    );
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
        <div className='modal-box '>
          <div className='flex items-center'>
            {/* <h3 className='font-bold text-lg mr-3'>클럽찾기</h3> */}
            <input
              type='text'
              className='input input-primary h-5 text-xs mb-3 p-3'
              placeholder='클럽 검색'
              onClick={onShowSearchModal}
              // disabled
            />
            {loading ? <Loading /> : null}
          </div>
          <KaKaoMap
            // userLocation={userLocation}
            onClickMap={onClickMap}
            // onChangeMapCenter={onChangeMapCenter}
            clubList={clubList}
            onClickPostClub={onClickPostClub}
          />
          {mapPosition.lat ? (
            <div>
              <button
                onClick={() => fetchNearClubList()}
                className='btn btn-sm absolute px-6 text-xs bottom-20 left-[50%] translate-x-[-50%] z-10'
              >
                재검색
              </button>
              <button onClick={resetUserPosition} className='absolute bottom-20 ring z-10 bg-white'>
                <IconContext.Provider value={{ size: '2rem', color: 'black' }}>
                  <BiCurrentLocation />
                </IconContext.Provider>
              </button>
            </div>
          ) : null}

          <div className='modal-action'>
            <label
              htmlFor='map-modal'
              className='btn btn-primary btn-sm rounded-md'
              onClick={onCancelModal}
            >
              취소
            </label>
            <label
              htmlFor='post-club-modal'
              ref={postModalRef}
              className='btn btn-primary btn-sm rounded-md'
            >
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
