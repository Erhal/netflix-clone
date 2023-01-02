import { FC, useEffect, useRef, useState } from 'react';
import { RiArrowDownSFill as ArrowDownIcon } from 'react-icons/ri';
import { RiArrowUpSFill as ArrowUpIcon } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

import avatar from '@/assets/images/avatar.png';
import logo from '@/assets/images/logo.png';

import './styles.scss';

const Navbar: FC = () => {
  const [showNavBG, setShowNavBG] = useState<boolean>(false);

  const avatarRef = useRef<HTMLUListElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const navigate = useNavigate();

  const toggleNavbarBG = () => {
    if (window.scrollY > 10) {
      setShowNavBG(true);
    } else {
      setShowNavBG(false);
    }
  };

  const handleMouseEnter = () => {
    if (dropdownRef.current) {
      dropdownRef.current.style.visibility = 'visible';
      dropdownRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (dropdownRef.current) {
      dropdownRef.current.style.visibility = 'hidden';
      dropdownRef.current.style.opacity = '0';
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('authToken')
    navigate('/')
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleNavbarBG);
    return () => window.removeEventListener('scroll', toggleNavbarBG);
  }, []);

  return (
    <div className={`Navbar ${showNavBG && 'nav-black'}`}>
      <div className="content">
        <ul className="content__group">
          <li>
            <Link to={'/'}>
              <img className="content__logo" src={logo} alt="logo" />
            </Link>
          </li>
          <li className="content__link">Home</li>
          <li className="content__link">TV Shows</li>
          <li className="content__link">Movies</li>
          <li className="content__link">Latest</li>
          <li className="content__link">My list</li>
        </ul>
        <ul
          className="content__group avatar"
          ref={avatarRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <li>
            <img className="avatar__img" src={avatar} alt="avatar" />
          </li>
          <li>
            <ArrowDownIcon
              className="avatar__arrow"
              size={'20px'}
              color={'#ddd'}
            />
            <ul
              className="dropdown"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >

              <li className="dropdown__list-element">Manage Profiles</li>
              <li className="dropdown__list-element">Transfer Profile</li>
              <li className="dropdown__list-element">Account</li>
              <li className="dropdown__list-element">Help Center</li>
              <hr/>
              <li className="dropdown__list-element" onClick={handleLogOut}>Sign out of Netflix</li>

              <ArrowUpIcon
                className="dropdown__arrow"
                size={'25px'}
                color={'#ddd'}
              />
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
