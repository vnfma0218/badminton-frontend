import { AddressInfo } from '@/components/Kakao/KaKaoMap';
import AlertModal from '@/components/Modal/AlertModal';
import usePrivateAxios from '@/hooks/usePrivateAxios';
import { postClub } from '@/lib/api/club';
import { useRef, useState } from 'react';

interface PostClubModalProps {
  addrInfo: AddressInfo;
  onSuccessPostCb: () => void;
}

const PostClubModal = ({ addrInfo, onSuccessPostCb }: PostClubModalProps) => {
  const privateAxios = usePrivateAxios();
  const alertRef = useRef(null);
  const postModalRef = useRef(null);
  const [alertTitle, setAlertTitle] = useState('');
  const [confirmCbFunction, setConfirmCbFunction] = useState<() => void>();

  const [clubNm, setClubNm] = useState('');
  const saveClub = async () => {
    const res = await postClub(privateAxios, { ...addrInfo, name: clubNm });
    console.log('saveClub');
    if (res.resultCode === '0000') {
      setAlertTitle('클럽이 등록되었습니다');
      setConfirmCbFunction(undefined);
      (alertRef.current as any).click();
      (postModalRef.current as any).click();
      onSuccessPostCb();
    }
  };

  const onSaveBtnClick = () => {
    setAlertTitle('클럽을 등록하시겠습니까?');
    setConfirmCbFunction(() => saveClub);
    (alertRef.current as any).click();
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
            <label ref={postModalRef} htmlFor='post-club-modal' className='btn'>
              취소
            </label>
            <label className='btn' onClick={onSaveBtnClick}>
              확인
            </label>
            <label ref={alertRef} htmlFor='alert-modal' className='hidden'></label>
          </div>
        </div>
      </div>
      <AlertModal title={alertTitle} confirmCbFn={confirmCbFunction && confirmCbFunction} />
    </>
  );
};
export default PostClubModal;
