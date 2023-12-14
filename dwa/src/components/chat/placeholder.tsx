import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useMediaQuery } from '@uidotdev/usehooks';
import { AlertCircle, Cpu, MessagesSquare } from 'lucide-react';

const infoCards = [
  {
    title: 'Example',
    icon: MessagesSquare,
    tags: ['How can i get better?']
  },
  {
    title: 'Capabilites',
    icon: Cpu,
    tags: ['Provide information and answer questions']
  },
  {
    title: 'Limitations',
    icon: AlertCircle,
    tags: ['Potential for biased or inappropiate responses']
  }
];

const Placeholder = () => {
  const isSMDevice = useMediaQuery('only screen and (min-width: 640px)');
  const isMDDevice = useMediaQuery('only screen and (min-width: 769px)');

  return (
    <div className="flex flex-col items-center h-full justify-around">
      <div className="flex items-center">
        <img className="w-12 h-12 mr-1" src="/comitia-logo-transparent.png" />
        <h2 className="text-2xl font-bold">Comitia</h2>
      </div>

      <div className="flex gap-5 justify-between w-full 2xl:w-3/4">
        {infoCards.map((card, ind) => {
          if (ind === 0 && !isSMDevice) return null;
          if (ind === 1 && !isMDDevice) return null;

          return (
            <Card className="flex-1 h-full" key={card.title}>
              <CardContent>
                <CardHeader className="flex items-center">
                  {<card.icon className="w-7 h-7 text-indigo-500" />}

                  <h3 className="text-xl">{card.title}</h3>
                </CardHeader>
                <div className="flex flex-col gap-3">
                  {card.tags.map((tag) => (
                    <div className="bg-secondary rounded-md px-3 py-2" key={tag}>
                      {tag}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Placeholder;
