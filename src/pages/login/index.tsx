import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { publicAxios } from 'src/lib/axios'
import { useAppDispatch } from 'src/store/hooks'
import { updateAuthState } from 'src/store/slices/authSlice'
import styles from '../../../styles/login/Login.module.css'

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const onSubmitLogin = async (e: FormEvent) => {
    e.preventDefault()
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
      console.log('login succes', userId, accessToken)
      dispatch(updateAuthState({ userId, accessToken }))
      router.replace('/')
    }
  }
  return (
    <div className='w-3/4 m-auto pt-32 pb-32 text-center'>
      <form
        onSubmit={onSubmitLogin}
        className='border-solid border-2 border-slate-500 rounded-md p-10 pt-20  '
      >
        <div className='form-control'>
          <label className='input-group justify-center mb-10'>
            <span className='w-32'>닉네임</span>
            <input type='text' placeholder='닉네임...' className='input input-bordered w-72' />
          </label>
        </div>
        <div className='form-control'>
          <label className='input-group justify-center mb-10'>
            <span className='w-32'>이메일</span>
            <input type='text' placeholder='info@site.com' className='input input-bordered w-72' />
          </label>
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
        <button type='submit' className='btn btn-accent'>
          로그인
        </button>
      </form>
    </div>
  )
}

export default LoginPage
// <div className={styles.login}>
//   {/* <h1>Login TODO: next-auth 사용하기</h1> */}
//   <h1>Login</h1>
//   <form onSubmit={onSubmitLogin} className={styles.loginForm}>
//     <div className={styles.form_control}>
//       <label htmlFor='name'>Name</label>
//       <input type='name' placeholder='Your Name' />
//     </div>
//     <div className={styles.form_control}>
//       <label htmlFor='email'>Email</label>
//       <input type='email' placeholder='Your Email' />
//     </div>
//     <div className={styles.form_control}>
//       <label htmlFor='password'>Password</label>
//       <input type='password' placeholder='Your Password' />
//     </div>
//     <div className={styles.form_control}>
//       <label htmlFor='password-repeat'>Repeat Password </label>
//       <input type='password-repreat' placeholder='Repeat Password' />
//     </div>
//     <button type='submit'>Submit</button>
//   </form>
// </div>
