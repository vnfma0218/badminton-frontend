import { publicAxios } from '@/lib/axios'
import { useAppDispatch } from '@/store/hooks'
import { updateAuthState } from '@/store/slices/authSlice'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

const Temp = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  console.log(watch())
  console.log('error', errors)

  const onSubmitLogin = async (data: Inputs) => {
    console.log(data)
    console.log('submit')
    const res = await publicAxios({
      url: '/login',
      method: 'post',
      data: {
        email: 'vnfma0218@naver.com',
        password: 'tkfkdgo1!',
      },
      withCredentials: true,
    })

    if (res.status === 200) {
      const { userId, accessToken } = res.data
      dispatch(updateAuthState({ userId, accessToken }))
      router.replace('/')
    }
  }

  return (
    <div className='w-full h-full m-auto border p-3 bg-gray-100 flex justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmitLogin)} className='max-w-sm p-8 bg-white rounded-3xl'>
        <h1 className='text-2xl text-center font-bold mb-14'>로그인</h1>
        <input
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: '이메일 형식이 아닙니다.',
            },
          })}
          type='text'
          placeholder='email'
          className={`input input-primary w-80 ${errors.email ? '' : 'mb-4'}`}
        />
        {errors.email?.message && (
          <div className=''>
            <p className='text-start ml-2 text-red-400 mb-4'>{errors.email?.message}</p>
          </div>
        )}
        <input
          {...register('password', {
            required: '비밀번호를 입력해주세요',
          })}
          type='password'
          placeholder='password'
          className='input input-primary w-80'
        />

        {errors.password?.message && (
          <div className='w-full'>
            <p className='text-start ml-2 text-red-400 mb-4 w-full'>{errors.password?.message}</p>
          </div>
        )}

        <button type='submit' className='btn btn-primary w-full mt-11'>
          로그인
        </button>
      </form>
    </div>
  )
}
export default Temp
