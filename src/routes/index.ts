import * as Screens from '@/screens';

import { IRoutes } from '@/routes/types';

const routes: IRoutes[] = [
  {
    path: '/',
    Screen: Screens.Home,
  },
  {
    path: '*',
    Screen: Screens.Page404,
  },
  {
    path: 'login',
    Screen: Screens.Login,
  },
  {
    path: 'browse',
    Screen: Screens.Browse,
  },
  {
    path: 'signup',
    Screen: Screens.Signup,
  },
];

export default routes;
