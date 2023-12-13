import Login from '@/components/login';
import Splash from '@/components/splashes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import useIsAuthorized from '@/hook/useIsAuthorized';
import { faqs, features } from '@/lib/constants';
import RequestStatus from '@/lib/enums';
import { validPath } from '@/lib/routing';
import { paths } from '@/router';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Home = () => {
  const loggedIn = useIsAuthorized();

  const [query] = useSearchParams();
  const [showLoginModal, setShowLoginModal] = useState(query.get('login') != null ? true : false);

  return (
    <>
      <div className="bg-secondary">
        <div className="relative px-6 isolate pt-14 lg:px-8">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex items-center lg:flex-1">
                <img className="w-12 h-12 mr-1" src="/comitia-logo-transparent.png" />
                <h2 className="text-2xl font-bold">Comitia</h2>
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {loggedIn === RequestStatus.TRUE ? (
                  <Button asChild variant="link">
                    <Link to={validPath(paths.chat_with_id, { id: 'ai' })}>
                      Get started{' '}
                      <span className="ml-1" aria-hidden="true">
                        &rarr;
                      </span>
                    </Link>
                  </Button>
                ) : (
                  <Login variant="link" />
                )}
              </div>
            </nav>
          </header>
          <Splash />
          <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <h2 className="relative px-3 py-1 text-2xl leading-6 rounded-full text-primary">
                Comitia Helps
              </h2>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
                Privacy focused Mental Health assistance
              </h1>
              <p className="mt-6 text-lg leading-8 text-secondary-foreground">
                A Web5 Hackathon project
              </p>
              <div className="flex items-center justify-center mt-10 gap-x-6">
                {loggedIn === RequestStatus.TRUE ? (
                  <Button asChild size="lg">
                    <Link to={validPath(paths.chat_with_id, { id: 'ai' })}>Get started</Link>
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

      <div className="py-24 bg-secondary sm:py-32">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Comitia Helps</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
              Mental Health Prioritized
            </p>
            <p className="mt-6 text-lg leading-8 text-primary">
              Comitia provides a private space for users to receive mental health counseling from an
              intelligent AI therapist.{' '}
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-primary">
                    <div className="absolute left-0 flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg top-1">
                      <feature.icon className="w-6 h-6 text-secondary" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-primary">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="relative px-6 py-24 isolate bg-secondary sm:py-32 lg:px-0">
        <Splash />
        <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="p-12 -mt-12 -ml-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[48rem] max-w-none rounded-xl bg-primary-foreground shadow-xl ring-1 ring-secondary/10 sm:w-[57rem]"
              src="/app-preview.png"
              alt="A preview of the application"
            />
          </div>

          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:max-w-lg lg:pr-4">
              <p className="text-base font-semibold leading-7 text-indigo-600">
                AI That Understands You
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Intelligent Conversations
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                Built on the open-source Meta Llama 2 model, Comitia has been augmented to hold
                contextually relevant conversations with you on mental health issues.
                <br />
                <br />
                Every interaction is an opportunity for it to learn, ensuring that your experience
                is consistently improving and adapting to your mental health journey.
              </p>
            </div>
          </div>

          <div className="space-y-16 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div>
              <div className="lg:pr-4 lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  Your Data, Your Terms
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  No-compromise Data Privacy
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-700">
                  Powered by decentralized web technology, Comitia ensures that your data is always
                  in your control. Your data is kept in your DWN and you only grant us access to it
                  when accessing the application.
                  <br />
                  <br />
                  You can export, modify or delete your data at any time.
                </p>
              </div>
            </div>
            <div className="" />
            <div className="lg:pr-4 lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">Lock-in who?</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Interoperable
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                We keep your data in formats compliant with the FHIR health industry standard. This
                allows your data to be useful even outside of Comitia.
                <br />
                <br />
                Therapists, general practitioners and other applications will be able to review your
                conversations and health data, understand your mental health journey, and pick up
                where Comitia Helps left off.
              </p>
            </div>
          </div>
        </div>

        <Splash />
      </div>

      <div className="py-24 bg-secondary sm:py-32">
        <div className="px-6 mx-auto max-w-7xl gap-x-8 gap-y-20 lg:px-8 xl:grid-cols-3">
          <div>
            <h2 className="py-3 text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => {
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
