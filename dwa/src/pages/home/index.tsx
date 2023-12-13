import Login from '@/components/login';
import Splash from '@/components/splashes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import useIsAuthorized from '@/hook/useIsAuthorized';
import { faqs, features } from '@/lib/constants';
import RequestStatus from '@/lib/enums';
import { FolderLock } from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './index.css';

const Home = () => {
  const loggedIn = useIsAuthorized();

  const [query] = useSearchParams();
  const [showLoginModal, setShowLoginModal] = useState(
    query.get('login') != null ? true : false,
  );

  return (
    <>
      <div className="bg-secondary">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <h2 className="text-2xl font-bold">Comitia</h2>
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {loggedIn === RequestStatus.TRUE ? (
                  <Button asChild variant="link">
                    <Link to="/chat">
                      Get started <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </Button>
                ) : (
                  <Login variant="link" />
                )}
              </div>
            </nav>
          </header>
          <Splash />
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <h2 className="relative rounded-full px-3 py-1 text-2xl leading-6 text-primary">
                Comitia
              </h2>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
                Revolutionalising mental health with web5 and AI
              </h1>
              <p className="mt-6 text-lg leading-8 text-secondary-foreground">
                A Web5 Hackathon project
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {loggedIn === RequestStatus.TRUE ? (
                  <Button asChild>
                    <Link to="/chat">Get started</Link>
                  </Button>
                ) : (
                  <Login open={showLoginModal} setOpen={setShowLoginModal} />
                )}
              </div>
            </div>
          </div>
          <Splash />
        </div>
      </div>

      <div className=" bg-secondary py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Comitia Helps
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
              Mental Health Prioritized
            </p>
            <p className="mt-6 text-lg leading-8 text-primary">
              Comitia assists it's users with getting help with their mental
              health
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map(feature => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-primary">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        className="h-6 w-6 text-secondary"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-primary">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="relative isolate bg-secondary px-6 py-24 sm:py-32 lg:px-0">
        <Splash />
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  Deploy faster
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  A better workflow
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Aliquet nec orci mattis amet quisque ullamcorper neque, nibh
                  sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque
                  id at vitae feugiat egestas.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[48rem] max-w-none rounded-xl bg-primary-foreground shadow-xl ring-1 ring-secondary/10 sm:w-[57rem]"
              src="/app-preview.png"
              alt="A preview of the application"
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-primary lg:max-w-lg">
                <p>
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
                  risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                  Id dolor praesent donec est. Odio penatibus risus viverra
                  tellus varius sit neque erat velit. Faucibus commodo massa
                  rhoncus, volutpat. Dignissim sed eget risus enim. Mattis
                  mauris semper sed amet vitae sed turpis id.
                </p>
                <ul role="list" className="mt-8 space-y-8 text-primary">
                  <li className="flex gap-x-3">
                    <FolderLock
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-secondary-foreground">
                        Push to deploy.
                      </strong>{' '}
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Maiores impedit perferendis suscipit eaque, iste dolor
                      cupiditate blanditiis ratione.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <FolderLock
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-secondary-foreground">
                        SSL certificates.
                      </strong>{' '}
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                      irure qui lorem cupidatat commodo.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <FolderLock
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-secondary-foreground">
                        Database backups.
                      </strong>{' '}
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  Et vitae blandit facilisi magna lacus commodo. Vitae sapien
                  duis odio id et. Id blandit molestie auctor fermentum
                  dignissim. Lacus diam tincidunt ac cursus in vel. Mauris
                  varius vulputate et ultrices hac adipiscing egestas. Iaculis
                  convallis ac tempor et ut. Ac lorem vel integer orci.
                </p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-secondary-foreground">
                  No server? No problem.
                </h2>
                <p className="mt-6">
                  Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
                  consequat in. Convallis arcu ipsum urna nibh. Pharetra,
                  euismod vitae interdum mauris enim, consequat vulputate nibh.
                  Maecenas pellentesque id sed tellus mauris, ultrices mauris.
                  Tincidunt enim cursus ridiculus mi. Pellentesque nam sed
                  nullam sed diam turpis ipsum eu a sed convallis diam.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Splash />
      </div>

      <div className="bg-secondary py-24 sm:py-32">
        <div className="mx-auto max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div>
            <h2 className="text-3xl font-bold tracking-tight py-3">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map(faq => {
                return (
                  <AccordionItem value={faq.question} key={faq.question}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
