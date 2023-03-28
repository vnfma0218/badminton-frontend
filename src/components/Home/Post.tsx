import Image from 'next/image';

interface IPostItem {
  title: string;
  neededPeople: number;
  loacation: string;
  userImg: string;
}

const Post = ({ title, neededPeople, loacation, userImg }: IPostItem) => {
  return (
    <div className='card bg-base-100 card-side shadow-xl p-6 flex mt-3'>
      <div className='relative w-[100px]'>
        <Image
          src={userImg}
          alt='Picture of the author'
          objectFit='cover'
          layout='fill'
          style={{ borderRadius: '50%' }}
        />
      </div>
      <div className='flex justify-between items-center w-full ml-5'>
        <div className='flex flex-col gap-2'>
          <h3 className='font-bold'>{title}</h3>
          <p className='text-sm'>필요인원 {neededPeople}명</p>
          <p className='text-sm'>위치 {loacation}</p>
        </div>

        <div className='card-actions'>
          <button className='btn btn-primary'>참여</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
