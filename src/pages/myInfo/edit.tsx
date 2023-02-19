import ClubListModal from '@/components/myInfo/modals/ClubListModal';
import usePrivateAxios from '@/hooks/usePrivateAxios';
import { UserLevel } from '@/lib/api/common';
import { editUser, getUserById } from '@/lib/api/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateAlertState } from '@/store/slices/AlertSlice';
import { authState } from '@/store/slices/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export type Profile = {
  profileFile: File[];
  name: string;
  intro: string;
  clubName: string;
  peroid: string;
  level?: UserLevel;
};

const ProfileEditPage = () => {
  const dispatch = useAppDispatch();
  const privateAxios = usePrivateAxios();
  const { accessToken } = useAppSelector(authState);

  const [showMap, setShowMap] = useState(false);
  const modalRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Profile>();
  const avatar = watch('profileFile');

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUserById(privateAxios);
      // res
      console.log('reset', res.dataList.user);
      reset({
        ...res.dataList.user,
      });
    };
    if (accessToken) {
      getUserInfo();
    }
  }, [accessToken]);

  const onClearFile = () => {
    setAvatarPreview('');
    setValue('profileFile', []);
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

  const onSubmitHandler = async (data: Profile) => {
    console.log('data', data);
    const res = await editUser(privateAxios, data);
    if (res.resultCode === '0000') {
      dispatch(
        updateAlertState({
          message: '프로필이 저장되었습니다.',
          type: 'info',
        }),
      );
    }

    console.log('res', res);
  };

  return (
    <div className='mt-10'>
      {/* 유저 프로필 정보 */}
      <div className='card bg-base-100 shadow-xl py-6'>
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
            {...register('name', {
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
            className='input input-primary h-20 text-xs w-4/5 p-3'
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
        <select {...register('level')} className='select select-bordered w-4/5 mt-4 m-auto'>
          <option value={''}>회원님의 급수를 선택해주세요</option>
          <option value={'A'}>A조</option>
          <option value={'B'}>B조</option>
          <option value={'C'}>C조</option>
          <option value={'D'}> D조</option>
        </select>
        <button
          className='btn btn-primary w-4/5 mt-4 m-auto'
          onClick={handleSubmit(onSubmitHandler)}
        >
          수정완료
        </button>
      </div>
      {/* 유저 배드민턴 정보 */}
      <div className='mt-10'>
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
