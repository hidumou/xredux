/**
 * routes.js
 *
 * Config the routes
 *
 */

import NotFoundPage from './pages/NotFoundPage/Loadable';
import Demo from './pages/Demo/Loadable';

export default [
  {
    path: '/',
    component: Demo,
    exact: true,
  },
  {
    path: '/demo',
    component: Demo,
    exact: true,
  },
  {
    component: NotFoundPage,
  },
];
