import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MessagesSquare } from 'lucide-react';
import { Button } from '../ui/button';

import { inputFieldAtom, inputFieldRefAtom } from '@/store';
import { useAtom } from 'jotai';

const infoCards = [
  {
    title: 'Examples',
    icon: MessagesSquare,
    tags: [
      'What coping strategies do you suggest for anxiety?',
      'Can you recommend techniques to improve my sleep?',
      'What are some ways to build resilience?',
      'How can I support a friend struggling with depression?'
    ]
  }
];

const Placeholder = () => {
  const [, setInputField] = useAtom(inputFieldAtom);
  const [inputFieldRef] = useAtom(inputFieldRefAtom);

  return (
    <div className="flex flex-col items-center h-4/5 justify-around">
      <div className="flex items-center">
        <img className="w-12 h-12 mr-1" src="/comitia-logo-transparent.png" />
        <h2 className="text-2xl font-bold">Comitia</h2>
      </div>

      <div className="flex justify-between max-w-xl gap-5 2xl:w-3/4">
        {infoCards.map((card) => {
          return (
            <Card className="flex-1 h-full" key={card.title}>
              <CardContent>
                <CardHeader className="flex items-center">
                  {<card.icon className="text-indigo-500 w-7 h-7" />}

                  <h3 className="text-lg">{card.title}</h3>
                </CardHeader>
                <div className="flex flex-col gap-4">
                  {card.tags.map((tag) => (
                    <Button
                      variant="secondary"
                      className="flex justify-between items-center whitespace-normal"
                      key={tag}
                      onClick={() => {
                        setInputField(tag);
                        inputFieldRef?.focus();
                      }}
                    >
                      <span>{tag}</span>
                      <span>&rarr;</span>
                    </Button>
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
