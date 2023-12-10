import 'dotenv/config';
import { env } from './env';

export default {
  env: env.NODE_ENV,
  port: env.PORT
};
