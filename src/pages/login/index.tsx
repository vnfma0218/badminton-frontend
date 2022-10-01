import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { publicAxios } from 'src/lib/axios';
import { useAppDispatch } from 'src/store/hooks';
import { updateAuthState } from 'src/store/slices/authSlice';
import styles from '../../../styles/login/Login.module.css';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();
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
  return (
    <div className={styles.login}>
      {/* <h1>Login TODO: next-auth 사용하기</h1> */}
      <h1>Login</h1>
      <form onSubmit={onSubmitLogin} className={styles.loginForm}>
        <div className={styles.form_control}>
          <label htmlFor="name">Name</label>
          <input type="name" placeholder="Your Name" />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Your Email" />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Your Password" />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="password-repeat">Repeat Password </label>
          <input type="password-repreat" placeholder="Repeat Password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
