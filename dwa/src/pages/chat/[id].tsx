import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useGetChat from '@/hook/useGetChat';
import { cn } from '@/lib/utils';
import { ChevronUpCircleIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';

interface IBubble {
  text: React.ReactNode;
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
  // const { id } = useParams();
  const { chats, loading, send, isThinking } = useGetChat();
  const [message, setMessage] = useState('what is 2 + 2');

  const sendHandler = async () => {
    send(message);
  };

  const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {chats.map((chat, ind) => {
          return (
            <Bubble
              // TODO: add key
              key={ind}
              text={chat.message}
              isMe={chat.isMe}
            />
          );
        })}
        {isThinking && (
          <Bubble
            text={<Loader2Icon className="animate-spin" />}
            isMe={false}
          />
        )}
      </div>

      <div className="flex items-center">
        <Textarea
          className="rounded-none rounded-l-lg"
          value={message}
          onChange={updateText}
        />

        <Button
          variant="default"
          size="icon"
          className="h-full rounded-none rounded-r-lg"
          disabled={loading || !message || message.length < 1}
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
