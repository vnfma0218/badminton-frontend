import { login } from '@/lib/api/user'
import { publicAxios } from '@/lib/axios'
import { useAppDispatch } from '@/store/hooks'
import { updateAlertState } from '@/store/slices/AlertSlice'
import { updateAuthState } from '@/store/slices/authSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

const Temp = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmitLogin = async (data: Inputs) => {
    setLoading(true)
    try {
      const res = await login({ email: data.email, password: data.password })

      console.log('res', res)

      if (res.status === 200) {
        const { userId, accessToken } = res
        dispatch(updateAuthState({ userId, accessToken }))
        dispatch(updateAlertState({ show: true, message: '로그인 성공했어요' }))
        router.replace('/')
      }
    } catch (err) {
      dispatch(
        updateAlertState({
          show: true,
          message: '이메일 혹은 비밀번호를 다시 확인해주세요',
          type: 'info',
        }),
      )
    }
    setLoading(false)
  }

  return (
    <div className='relative w-full h-full m-auto border p-3 bg-gray-100 flex flex-col justify-center items-center overflow-hidden'>
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
            pattern: {
              value: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
              message: '8 ~ 16자 영문, 숫자, 특스문자를 1가지씩 조합',
            },
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

        <button
          type='submit'
          className={`btn btn-primary w-full mt-11 disabled`}
          disabled={loading}
        >
          로그인
        </button>
      </form>
      <div className='pt-3 grid grid-cols-3 divide-x-[2px] '>
        <Link href='/signup'>
          <a className='pl-6 cursor-pointer'>아이디 찾기</a>
        </Link>
        <Link href='/signup'>
          <a className='pl-3 pr-3 cursor-pointer'>비밀번호 찾기</a>
        </Link>
        <Link href='/signup'>
          <a className='pl-3 cursor-pointer'>회원가입</a>
        </Link>
      </div>
    </div>
  )
}
export default Temp
