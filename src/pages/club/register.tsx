//  클럽 등록하기 ( 임원  or  클럽장)
// 항목 : 클럽이름, 인원수, 나이, 성비, 클럽주소, 연혁?
import Address, { addrInfo } from '@/components/Kakao/Address';
import { CLUB_AGE_RAGNE } from '@/lib/Constants/index';
import { useState } from 'react';

const ClubRegisterPage = () => {
  const [addrInfo, setAddrInfo] = useState<addrInfo>();
  const onSuccessAddr = (addrInfo: addrInfo) => {
    setAddrInfo(addrInfo);
  };

  return (
    <div className='mt-12 border h-full'>
      <div className='form-control w-full max-w-xs'>
        <label className='label flex justify-start'>
          <span className='label-text text-lg'>클럽 이름</span>
          <span className='text-red-500 pl-1 pt-2'>*</span>
        </label>
        <input
          type='text'
          placeholder='클럽 이름'
          className='input input-bordered input-primary w-full max-w-xs rounded-lg'
        />
      </div>

      <p className='mt-5'>클럽 나이대를 입력해주세요 총 인원수 (명)</p>
      <div className='age-range flex'>
        {CLUB_AGE_RAGNE.map((age) => {
          return (
            <div className='form-control w-28 max-w-xs mr-3'>
              <label className='label'>
                <span className='label-text text-lg'>{age.text}</span>
              </label>
              <div className='flex items-center px-2 input input-primary w-20 rounded-lg border-2 focus-within:border-secondary '>
                <input
                  type='number'
                  placeholder='0'
                  className='w-full text-right focus:outline-none'
                  name={age.value}
                />
                <p className='ml-2'>명</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className='mt-10'>성비를 입력해주세요</p>
      <div className='flex'>
        <div className='form-control'>
          <label className='label flex justify-start'>
            <span className='label-text text-lg'>남자</span>
            <span className='material-icons'>man</span>
          </label>
          <div className='flex items-center px-2 input input-primary w-20 rounded-lg border-2 focus-within:border-secondary '>
            <input type='number' placeholder='0' className='w-full text-right focus:outline-none' />
            <p className='ml-2'>명</p>
          </div>
        </div>
        <div className='form-control ml-4'>
          <label className='label flex justify-start'>
            <span className='label-text text-lg'>여자</span>
            <span className='material-icons'>girl</span>
          </label>
          <div className='flex items-center px-2 input input-primary w-20 rounded-lg border-2 focus-within:border-secondary '>
            <input type='number' placeholder='0' className='w-full text-right focus:outline-none' />
            <p className='ml-2'>명</p>
          </div>
        </div>
      </div>

      <p className='mt-10'>주소 등록</p>
      <Address onSuccessAddr={onSuccessAddr} />
      {addrInfo && (
        <p>{`${addrInfo?.jibunAddress} ${addrInfo.roadAddress} ${addrInfo.zonecode}`}</p>
      )}

      <p className='mt-10'>클럽 대표사진</p>
      <p className='mt-10'>클럽 상세사진</p>
    </div>
  );
};
export default ClubRegisterPage;
