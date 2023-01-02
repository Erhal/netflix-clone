import { FC, useEffect, useState } from 'react';

import { API_KEY } from '@/api/Request';
import axios from '@/api/axios';

import truncate from '@/helpers/truncate';

import { IMovie } from '@/types';

import './styles.scss';

const Banner: FC = () => {
  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `movie/800815?api_key=${API_KEY}&language=en-US`,
      );
      setMovie(result.data);
    };

    fetchData().catch(error => console.error(error));
  }, []);

  return (
    <div className="Banner">
      <header className="header">
        <div className="iframe__wrap">
          <iframe
            className="video__frame"
            src="https://www.youtube-nocookie.com/embed/ddbL9jvg77w?controls=0&autoplay=1&mute=1"
            frameBorder="0"
          />
        </div>
        <div className="header__contents">
          <h1 className="header__title">{movie?.title}</h1>
          <div className="header__buttons">
            <button type="button" className="header__button">
              Play
            </button>
            <button type="button" className="header__button">
              My list
            </button>
          </div>
          <h1 className="header__description">
            {movie && truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className="header__fadeBottom" />
      </header>
    </div>
  );
};

export default Banner;
