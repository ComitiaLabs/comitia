import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useGetChat from '@/hook/useGetChat';
import { cn } from '@/lib/utils';
import { ChevronUpCircleIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface IBubble {
  text: string;
  isMe: boolean;
}
const Bubble = (props: IBubble) => {
  return (
    <>
      <div className={cn('flex justify-end', !props.isMe && 'justify-start')}>
        <div
          className={cn(
            'bg-green-400 text-white rounded-md p-3',
            !props.isMe && 'bg-red-400',
          )}
        >
          {props.text}
        </div>
      </div>
    </>
  );
};

const Chat = () => {
  const { id } = useParams();
  const { chats } = useGetChat(`${id}`);

  const userID = '1';

  const [loading, setLoading] = useState(false);

  const sendHandler = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col gap-0 ">
        {chats.map(chat => {
          return (
            <Bubble
              key={chat.id}
              text={chat.message}
              isMe={chat.senderId === userID}
            />
          );
        })}
      </div>

      <div className="flex items-center">
        <Textarea className="rounded-none rounded-l-lg" />

        <Button
          variant="default"
          size="icon"
          className="h-full rounded-none rounded-r-lg"
          disabled={loading}
          onClick={sendHandler}
        >
          {!loading ? (
            <ChevronUpCircleIcon className="h-4 w-4" />
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </Button>
      </div>
    </>
  );
};

export default Chat;
