import { BiCurrentLocation } from 'react-icons/bi';
import { IconContext } from 'react-icons';

import KaKaoMap, { AddressInfo } from '@/components/Kakao/KaKaoMap';
import { getNearClubList } from '@/lib/api/club';
import { Club } from '@/lib/types';
import { getLocation } from '@/lib/util/functions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { mapState, updateMapPosState } from '@/store/slices/mapSlice';
import { useEffect, useRef, useState } from 'react';
import SearchClubListModal from './SearchClubListModal';

interface ClubFullSizeModalProps {
  onCloseModal: () => void;
}

const ClubFullSizeModal = ({ onCloseModal }: ClubFullSizeModalProps) => {
  const { mapPosition } = useAppSelector(mapState);
  const dispatch = useAppDispatch();

  const [clickedPosition, setClickedPosition] = useState<AddressInfo>();
  const [clubList, setClubList] = useState<Club[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchModalRef = useRef(null);

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

  const onShowSearchModal = () => {
    setShowSearchModal(true);
    setTimeout(() => {
      (searchModalRef.current as any).click();
    }, 100);
  };

  const resetUserPosition = () => {
    getUserLocation();
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
      <div className='fixed z-50 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-full h-full'>
          <div className='h-full'>
            <div className='absolute top-4 left-4 right-4 z-50 flex justify-between items-center'>
              <input
                type='text'
                className='input h-10 text-sm p-4 w-72   z-50 rounded-xl border-gray-400 border-1'
                placeholder='클럽 검색'
                onClick={onShowSearchModal}
                // disabled
              />
              <div
                onClick={onCloseModal}
                className='text-xl p-4 bg-white rounded-full border z-50 w-10 h-10 flex items-center justify-center text-gray-500'
              >
                X
              </div>
            </div>
            <KaKaoMap onClickMap={onClickMap} clubList={clubList} />
            <button
              onClick={resetUserPosition}
              className='absolute bottom-20 z-10 bg-white p-2 rounded-full'
            >
              <IconContext.Provider value={{ size: '1.5rem', color: 'black' }}>
                <BiCurrentLocation />
              </IconContext.Provider>
            </button>
          </div>
        </div>
      </div>

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

export default ClubFullSizeModal;
