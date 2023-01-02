import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Banner, Navbar, Row } from '@/components';

import requests from '@/api/Request';

const Browse: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) navigate('/');
  }, []);

  return (
    <div className="Browse">
      <Navbar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
};

export default Browse;
