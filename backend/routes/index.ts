import express from 'express';
import config from '../config/config';
import baseRoutes from './base.routes';

const router = express.Router();

type Branch = { path: string; route: express.Router };
type Branches = Branch[];

const defaultRoutes: Branches = [{ path: '/', route: baseRoutes }];

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
