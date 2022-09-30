import styles from '../../../styles/login/Login.module.css';

import { useForm, SubmitHandler } from 'react-hook-form';
import { publicAxios } from 'src/lib/axios';

type Inputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitHandler: SubmitHandler<Inputs> = async (data: Inputs) => {
    const { name, email, password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      setError('passwordConfirm', {
        message: '비밀번호가 서로 달라요',
      });
    }

    const res = await publicAxios({
      url: '/signup',
      method: 'post',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    console.log(res);
    reset();
  };
  //   console.log(errors);
  //  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}$/
  return (
    <div className={styles.login}>
      <h1>Signup</h1>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={styles.loginForm}
      >
        <div className={styles.form_control}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            placeholder="Your Name"
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
        <p className={styles.error_message}>{errors.name?.message}</p>
        <div className={styles.form_control}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Your Email"
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '올바른 이메일 형식으로 입력해주세요',
              },
            })}
          />
          <p className={styles.error_message}>{errors.email?.message}</p>
        </div>
        <div className={styles.form_control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Your Password"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              pattern: {
                value:
                  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
                message: '8 ~ 16자 영문, 숫자, 특스문자를 1가지씩 조합',
              },
            })}
          />
        </div>
        <p className={styles.error_message}>{errors.password?.message}</p>
        <div className={styles.form_control}>
          <label htmlFor="passwordConfirm">Repeat Password </label>
          <input
            type="password"
            placeholder="Repeat Password"
            {...register('passwordConfirm', {
              required: '비밀번호를 입력해주세요',
              pattern: {
                value:
                  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
                message: '8 ~ 16자 영문, 숫자, 특수문자를 1가지씩 조합',
              },
            })}
          />
        </div>
        <p className={styles.error_message}>
          {errors.passwordConfirm?.message}
        </p>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};
export default SignupPage;
