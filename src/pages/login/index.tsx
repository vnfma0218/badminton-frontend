import { useRouter } from 'next/router';
import { FormEvent, useContext } from 'react';
import AuthContext from 'src/components/contexts/AuthContext';
import axios from 'src/lib/axios';
import styles from '../../../styles/login/Login.module.css';

const LoginPage = () => {
  const router = useRouter();
  const { accessToken, updateAuthState } = useContext(AuthContext);
  const onSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();
    console.log('submit');
    const res = await axios({
      url: 'login',
      method: 'post',
      data: {
        email: 'vnfma0218@naver.com',
        password: 'tkfkdgo1!',
      },
    });

    if (res.status === 200) {
      // setAuth((prev) => ({
      //   ...prev,
      //   accessToken: res.data.accessToken,
      //   role: 'user',
      // }));
      updateAuthState(res.data.accessToken, 'user');
    }
  };
  return (
    <div className={styles.login}>
      <button
        onClick={() => {
          router.push('/');
        }}
      >
        home
      </button>
      <button
        onClick={() => {
          router.push('/post/new');
        }}
      >
        post
      </button>
      <h1>Login TODO: next-auth 사용하기</h1>
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
