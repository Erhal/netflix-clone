import { Route, Routes } from 'react-router-dom';

import routes from '@/routes';

const App = () => {
  return (
    <Routes>
      {routes.map(({ path, Screen }) => (
        <Route key={path} path={path} element={<Screen />} />
      ))}
    </Routes>
  );
};

export default App;
