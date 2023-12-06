import express from 'express';
import config from '../../config/config';
import baseRoute from './base.routes';
import electionRoute from './election.routes';

const router = express.Router();

type Branch = { path: string; route: express.Router };
type Branches = Branch[];
const defaultRoutes: Branches = [
  { path: '/test', route: baseRoute },
  { path: '/election', route: electionRoute }
];

/* routes available only in development mode */
const devRoutes: Branches = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
