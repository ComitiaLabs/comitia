import { Toaster } from '@/components/ui/toaster';
import router from '@/router';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Comitia</title>
      </Helmet>
      <RouterProvider router={router} />
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
