import { publicAxios } from '@/lib/axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/store/hooks';
import { updateAuthState } from 'src/store/slices/authSlice';

export type AuthInputs = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();

  const onSubmitLogin = async (data: AuthInputs) => {
    console.log(data);
    console.log('submit');
    const res = await publicAxios({
      url: '/login',
      method: 'post',
      data: {
        email: 'vnfma0218@naver.com',
        password: 'tkfkdgo1!',
      },
      withCredentials: true,
    });

    if (res.status === 200) {
      const { userId, accessToken } = res.data;
      console.log('login succes', userId, accessToken);
      dispatch(updateAuthState({ userId, accessToken }));
      router.replace('/');
    }
  };
  console.log(watch(), errors);
  return (
    <div className=' m-auto p-8 border-solid border-2 border-slate-500 rounded-md'>
      <h1 className='pb-10 text-4xl'>Login</h1>
      <form onSubmit={handleSubmit(onSubmitLogin)} className='m-auto'>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Nickname
          </label>
          <input
            {...register('nickname', {
              maxLength: {
                value: 10,
                message: '닉네임은 10자 이내로 작성해주세요',
              },
              required: '닉네임은 필수 입력사항입니다.',
            })}
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-56'
            placeholder='John'
            required
          />
        </div>
        {errors.nickname?.message && <p className='text-start pt-2'>{errors.nickname?.message}</p>}

        <div className='form-control mb-10'>
          <label className='input-group justify-center'>
            <span className='w-32'>이메일</span>
            <input
              type='text'
              {...register('email', {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: '이메일 형식이 아닙니다.',
                },
                required: '이메일은 필수 입력사항입니다.',
              })}
              placeholder='info@site.com'
              className='input input-bordered w-72'
            />
          </label>
          {errors.email?.message && <p className='text-start pt-2'>{errors.email?.message}</p>}
        </div>
        <div className='form-control'>
          <label className='input-group justify-center mb-10'>
            <span className='w-32'>비밀번호</span>
            <input type='text' placeholder='비밀번호' className='input input-bordered w-72' />
          </label>
        </div>
        <div className='form-control'>
          <label className='input-group justify-center mb-10'>
            <span className='w-32 text-sm'>비밀번호 확인</span>
            <input
              type='text'
              placeholder='비밀번호를 다시 입력해주세요'
              className='input input-bordered  w-72'
            />
          </label>
        </div>
        <button type='submit' className='btn btn-secondary btn-lg btn-wide'>
          로그인
        </button>
      </form>
      <div className='pt-10'>
        <p className='mb-5'>아이디가 없으면 회원가입을 해보세요</p>
        <button className='btn btn-primary'>회원가입</button>
      </div>
    </div>
  );
};

export default LoginPage;
