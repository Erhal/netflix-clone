import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { IFormData, IUseLoginForm } from '@/screens/Login/_types';

import logo from '@/assets/images/logo.png';

import './styles.scss';
import { signup } from '@/helpers/signup-request';

const Signup: FC = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<IUseLoginForm>({ mode: 'onBlur' });
  const navigate = useNavigate();

  const onSubmit = (data: IFormData) => {
    signup(data.email, data.password).then(data => {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        sessionStorage.removeItem('email');
        navigate('/browse');
      }

      if (data.message) {
        setError("email", {message: data.message});
      }
    })
  };

  useEffect(() => {
    if (localStorage.getItem('authToken')) navigate('/browse');
  }, [])

  return (
    <div className="Signup">
      <header>
        <div className="container">
          <div className="logo-holder">
            <Link to={'/'}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="link">
            <Link to={'/login'}>Sign In</Link>
          </div>
        </div>
      </header>
      <main>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="form__title">
            Create a password to start your membership
          </h1>
          <div className="form__context">
            Just a few more steps and you're done!
          </div>
          <div className="form__context">We hate paperwork, too.</div>
          <div className="form__email">
            <input
              className={`form__input ${errors.email ? 'is-invalid' : ''}`}
              type="email"
              placeholder=" "
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
            <label className="form__placeholder" htmlFor="email">
              Email address
            </label>
          </div>
          <div className="form__password">
            <input
              className={`form__input ${errors.password ? 'is-invalid' : ''}`}
              type="password"
              placeholder=" "
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
            <label className="form__placeholder" htmlFor="password">
              Password
            </label>
          </div>
          <label className="checkbox">
            <input className="checkbox__input" type="checkbox" />
            <span className="checkbox__text">
              Please do not email me Netflix special offers.
            </span>
            <span className="checkbox__checkmark"></span>
          </label>
          <button className="form__button" type="submit">
            Next
          </button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
