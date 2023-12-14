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
        <meta name="title" content="Comitia Help" />
        <meta name="description" content="Bot that acts as a therapist. Users get to own their data. All the chats had with this bot and the medical info shared in the conversation are theirs." />
        <meta name="keywords" content="mental health, mental, health, AI, web5, TBD, hackathon, replicate" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />
        <meta name="author" content="ComitiaLabs(https://github.com/ComitiaLabs/)" />

        {/* <!--  Essential META Tags --> */}
        <meta property="og:title" content="Comitia Help" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://comitia-dwa-production.up.railway.app/app-preview.png" />
        <meta property="og:url" content="https://comitia-dwa-production.up.railway.app" />
        <meta property="og:description" content="Bot that acts as a therapist. Users get to own their data. All the chats had with this bot and the medical info shared in the conversation are theirs." />
        <meta property="og:site_name" content="Comitia Help" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* <!--  Non-Essential, But Recommended --> */}
        <meta name="twitter:image:alt" content="Comitia Chat" />

        {/* <!--  Favicons --> */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      </Helmet>
      <RouterProvider router={router} />
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
