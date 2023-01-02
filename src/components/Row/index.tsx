import { FC, useEffect, useState } from 'react';

import axios from '@/api/axios';

import { IRowProps } from './_type';
import { IMovie } from '@/types';

import './styles.scss';

const Row: FC<IRowProps> = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(fetchUrl);
      setMovies(result.data.results);
      return result;
    };

    fetchData().catch(error => console.error(error));
  }, [fetchUrl]);

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row__posters">
        {!!movies.length &&
          movies.map(
            movie =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  className={`Row__poster ${isLargeRow && 'Row__posterLarge'}`}
                  key={`movie-img ${movie.id}`}
                  src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.title}
                />
              ),
          )}
      </div>
    </div>
  );
};

export default Row;
