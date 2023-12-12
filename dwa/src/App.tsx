import { Toaster } from '@/components/ui/toaster';
import router from '@/router';
import { Helmet } from 'react-helmet';
import { RouterProvider } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <>
      <Helmet>
        <title>Comitia</title>
      </Helmet>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
