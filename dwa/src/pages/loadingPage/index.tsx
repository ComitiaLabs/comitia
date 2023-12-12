import Splash from '@/components/splashes';
import { Loader } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="overflow-hidden w-full h-full flex justify-center items-center absolute isolate">
      <Splash />
      <Loader
        size={100}
        className="text-primary animate-[spin_3s_linear_infinite]"
      />
      <Splash />
    </div>
  );
};

export default LoadingPage;
