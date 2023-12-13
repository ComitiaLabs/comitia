import { Card, CardContent, CardHeader } from '@/components/ui/card';

const infoCards = [
  {
    title: 'Example',
    icon: 'icon',
    tags: ['write step', 'write step', 'write step', 'write step', 'write step']
  },
  {
    title: 'Capabilites',
    icon: 'icon',
    tags: ['write step', 'write step', 'write step', 'write step', 'write step']
  },
  {
    title: 'Limitations',
    icon: 'icon',
    tags: ['write step', 'write step', 'write step', 'write step', 'write step']
  }
];

const Placeholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div>comitia</div>

      <div className="grid grid-cols-3 gap-2">
        {infoCards.map((card) => (
          <Card>
            <CardContent>
              <CardHeader>{card.title}</CardHeader>
              <div className="flex flex-col gap-3">
                {card.tags.map((tag) => (
                  <div className="bg-secondary rounded-md px-3 py-2">{tag}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Placeholder;
