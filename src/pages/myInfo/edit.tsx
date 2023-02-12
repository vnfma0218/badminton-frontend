import KaKaoMap from '@/components/Kakao/KaKaoMap';
import ClubListModal from '@/components/myInfo/ClubListModal';
import Loading from '@/components/UIElement/Loading';
import { useAppSelector } from '@/store/hooks';
import { authState } from '@/store/slices/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type Profile = {
  profileFile: File[];
  nickname: string;
  intro: string;
  clubName: string;
  peroid: string;
  level: 'A' | 'B' | 'C' | 'D';
};

const ProfileEditPage = () => {
  const { nickname } = useAppSelector(authState);
  const [showMap, setShowMap] = useState(false);
  const modalRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Profile>();
  const avatar = watch('profileFile');

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      console.log(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  const onClearFile = () => {
    setAvatarPreview('');
    setValue('profileFile', []);
  };

  const onShowAddr = (addrInfo: { load: string; jibun: string }) => {
    console.log(addrInfo);
  };
  const showMapModal = () => {
    setShowMap(true);
    setTimeout(() => {
      (modalRef.current as any).click();
    }, 100);
  };
  const onCancelModal = () => {
    setShowMap(false);
  };

  console.log(watch());

  return (
    <div className='mt-32 flex'>
      {/* 유저 프로필 정보 */}
      <div className='card w-96 bg-base-100 shadow-xl py-11'>
        <div className='flex justify-center relative'>
          <label
            htmlFor='profile'
            className={`w-36 h-36 rounded-full cursor-pointer ${!avatarPreview && 'border'}`}
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt='프로필 파일 업로드'
                className='w-full h-full rounded-full'
              />
            ) : (
              <p className='px-5 mt-7'>프로필 업로드 해주세요</p>
            )}
          </label>
          <input type='file' {...register('profileFile')} id='profile' className='hidden' />
          {getValues('profileFile')?.length > 0 && (
            <button
              onClick={onClearFile}
              className='absolute right-32 border rounded-full w-7 text-xs h-7 bg-secondary text-slate-700'
            >
              취소
            </button>
          )}
        </div>
        <div className='text-center mt-8'>
          <input
            type='text'
            className='input input-primary h-8'
            placeholder='닉네임'
            {...register('nickname', {
              minLength: {
                value: 2,
                message: '이름은 최소 2글자 이상 입력해주세요',
              },
              maxLength: 10,
              required: '이름을 입력해주세요',
            })}
          />
        </div>
        <div className='text-center mt-8'>
          <textarea
            className='input input-primary h-20 text-xs w-4/5'
            placeholder='소개글'
            {...register('intro', {
              minLength: {
                value: 2,
                message: '자기소개는 2글자 이상 입력해주세요',
              },
              maxLength: 150,
              required: '이름을 입력해주세요',
            })}
          />
        </div>
      </div>
      {/* 유저 배드민턴 정보 */}
      <div className='ml-24'>
        <div>
          <h3 className='text-xl pb-1 px-2'>소속 클럽</h3>
          <button className='btn mt-4' onClick={showMapModal}>
            클럽 검색하기
          </button>
          {showMap ? <label htmlFor='map-modal' ref={modalRef}></label> : null}
        </div>
      </div>
      {showMap ? <ClubListModal onCancelModal={onCancelModal} /> : null}

      {/* <KaKaoMap onShowAddr={onShowAddr} /> */}
    </div>
  );
};
export default ProfileEditPage;
