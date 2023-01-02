import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import backgroundImage from '@/assets/images/background.jpeg';
import logo from '@/assets/images/logo.png';

import './styles.scss';

const Home: FC = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<{email: string}>({ mode: 'onBlur' });

  const navigate = useNavigate();

  const onSubmit = (data: {email:string}) => {
    sessionStorage.setItem('email', data.email.trim());
    navigate('/signup')
  };

  useEffect(() => {
    if (localStorage.getItem('authToken')) navigate('/browse')
  }, [])

  return (
    <div className="HomePage">
      <div className="HomePage__overlay" />
      <header className="header">
        <img className="header__logo" src={logo} alt="logo" />
        <Link to={'/login'}>
          <button className="header__signInBtn">Sign In</button>
        </Link>
      </header>
      <main
        className="main"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="card-box">
          <div className='text-box'>
            <h1 className="text-box__title">Unlimited movies, TV shows, and more.</h1>
            <h2 className="text-box__subtitle">Watch anywhere. Cancel anytime.</h2>
          </div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="form__title">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
              <input
                id="email"
                className={`form__input ${errors.email ? 'form__input--invalid' : ''}`}
                type="email"
                placeholder=" "
                defaultValue={sessionStorage.getItem('email') || ''}
                {...register('email', {
                  required:
                    'Email is required!',
                  pattern: {
                    value: /^[A-Z0-9_.-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi,
                    message:
                      'Please enter a valid email address',
                  },
                })}
              />
              <div className="form__error">
                {errors.email?.message}
              </div>
              <label className="form__placeholder" htmlFor="email">
                Email address
              </label>
              <button className="form__button" type="button" onClick={handleSubmit(onSubmit)}>
                Get Started
              </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
