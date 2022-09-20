import axios from 'axios';
import { FormEvent } from 'react';
import styles from '../../styles/login/Login.module.css';

const LoginPage = () => {
  const onSubmitLogin = (e: FormEvent) => {
    e.preventDefault();

    axios({
      url: 'http://localhost:3001/login',
      method: 'post',
      data: {
        name: '푸름쓰',
        email: 'vnfma0218@naver.com',
        password: '123',
        passwordChk: '123',
      },
    });
  };

  return (
    <div className={styles.login}>
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
