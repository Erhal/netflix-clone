import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { IFormData, IUseLoginForm } from '@/screens/Login/_types';

import { login } from '@/helpers/login-request';

import backgroundImage from '@/assets/images/background.jpeg';
import logo from '@/assets/images/logo.png';

import './styles.scss';

const Login: FC = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<IUseLoginForm>({ mode: 'onBlur' });
  const navigate = useNavigate();

  const onSubmit = (data: IFormData) => {
    login(data.email, data.password).then(data => {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        navigate('/browse');
      }

      if (data.type === 'email') {
        setError('email', { message: data.message });
      }

      if (data.type === 'password') {
        setError('password', { message: data.message });
      }

    });
  };

  useEffect(() => {
    if (localStorage.getItem('authToken')) navigate('/browse');
  }, []);

  return (
    <div
      className="LoginPage"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <header className="header">
        <Link to={'/'}>
          <img src={logo} className="header__logo" alt="logo" />
        </Link>
      </header>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__box">
          <h1 className="form__title">Sign In</h1>
          <div className="form__email">
            <input
              className={`form__input ${errors.email ? 'is-invalid' : ''}`}
              type="email"
              placeholder="Email"
              defaultValue={sessionStorage.getItem('email') || ''}
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value: /^[A-Z0-9_.-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi,
                  message: 'Please enter a valid email.',
                },
              })}
            />
            <div className="form__error">{errors.email?.message}</div>
          </div>
          <div className="form__password">
            <input
              className={`form__input ${errors.password ? 'is-invalid' : ''}`}
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{8,}$/,
                  message:
                    'Password should contain at least 8 characters, including UPPER/lowercase latin letters',
                },
              })}
            />
            <div className="form__error">{errors.password?.message}</div>
          </div>
          <button className="form__button" type="submit">
            Войти
          </button>
          <label className="checkbox">
            <input className="checkbox__input" type="checkbox" />
            <span className="checkbox__text">Remember me</span>
            <span className="checkbox__checkmark"></span>
          </label>
          <div className="other">
            <div className="other__title">
              <span>
                New to Netflix? <Link to={'/'}>Sign up now</Link>.
              </span>
            </div>
            <div className="other__subtitle">
              <span>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className="LoginPage__overlay" />
    </div>
  );
};

export default Login;
