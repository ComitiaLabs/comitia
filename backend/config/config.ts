import dotenv from 'dotenv';
import path from 'path';
import { env } from './env';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: env.NODE_ENV,
  port: env.PORT,
};
