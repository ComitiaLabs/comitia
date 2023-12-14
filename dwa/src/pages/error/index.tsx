import Splash from '@/components/splashes';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="overflow-hidden w-full h-full flex justify-center items-center absolute isolate">
      <Splash />
      <div className="text-center flex flex-col gap-1">
        <div className="text-center font-black text-9xl md:text-[13.75rem]">500</div>
        <h3 className=" text-center font-black text-4xl">Something bad just happened...</h3>
        <span className="max-w-lg  m-auto my-10">
          Our servers could not handle your request. Don&apos;t worry, our development team was
          already notified. Try refreshing the page.
        </span>
        <div className="flex flex-col items-center">
          <Button onClick={reload}>Refresh the page</Button>
        </div>
      </div>
      <Splash />
    </div>
  );
};

export default ErrorPage;
