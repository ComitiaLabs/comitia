import posthog from 'posthog-js';
import { env } from './env';

posthog.init(env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: env.VITE_PUBLIC_POSTHOG_HOST
});

export default posthog;
