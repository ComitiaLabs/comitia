import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';

const ScrollDown = ({
  parentRef,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
}) => {
  const scrollDownHandler = () => {
    if (parentRef.current?.scrollTop) {
      parentRef.current.scrollTop += 100;
    }
  };

  return (
    <Button
      onClick={scrollDownHandler}
      variant="outline"
      size="icon"
      className="absolute rounded-full bottom-0 left-2/4"
    >
      <ChevronDown className="h-4 w-4" />
    </Button>
  );
};

export default ScrollDown;
