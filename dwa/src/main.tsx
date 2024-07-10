import App from '@/App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { PostHogProvider } from 'posthog-js/react';
import posthog from '@/posthog';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>
);
