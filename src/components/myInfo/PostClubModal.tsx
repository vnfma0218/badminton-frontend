import usePrivateAxios from '@/hooks/usePrivateAxios';
import { postClub } from '@/lib/api/club';
import { useState } from 'react';
import { AddressInfo } from '../Kakao/KaKaoMap';
import AlertModal from '../Modal/AlertModal';

interface PostClubModalProps {
  addrInfo: AddressInfo;
}

const PostClubModal = ({ addrInfo }: PostClubModalProps) => {
  const privateAxios = usePrivateAxios();

  const [clubNm, setClubNm] = useState('');
  const saveClub = async () => {
    const res = await postClub(privateAxios, { ...addrInfo, name: clubNm });
    console.log(res);
  };
  return (
    <>
      <input type='checkbox' id='post-club-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mr-3'>클럽등록 신청</h3>
          <div className='divider'></div>
          <div>
            <div className='flex items-center'>
              <label className='mr-3'>클럽명</label>
              <input
                type='text'
                className='input input-primary h-5 text-xs'
                placeholder='클럽명'
                value={clubNm}
                onChange={(e) => {
                  setClubNm(e.target.value);
                }}
              />
            </div>
            <div className='divider'></div>

            <p className='text-base'>지번주소 : {addrInfo.jibun} </p>
            <div className='divider'></div>
            <p className='text-base'>도로명주소 : {addrInfo.loadAddress} </p>
            <div className='divider'></div>
          </div>
          <div className='modal-action'>
            <label htmlFor='post-club-modal' className='btn'>
              취소
            </label>
            <label htmlFor='alert-modal' className='btn'>
              확인
            </label>
          </div>
        </div>
      </div>
      <AlertModal
        title={'클럽을 등록하시겠습니까?'}
        confirmCbFn={() => {
          saveClub();
        }}
      />
    </>
  );
};
export default PostClubModal;
