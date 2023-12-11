import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useGetChat from '@/hook/useGetChat';
import useGetChatList from '@/hook/useGetChatList';
import { cn } from '@/lib/utils';
import { ChevronUpCircleIcon, Dot, Loader2Icon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

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

const PulsingDots = ({ count = 3 }) => {
  return (
    <div className="flex gap-0 items-center justify-center">
      {Array.from({ length: count }).map((_, ind) => (
        <Dot
          key={ind}
          className={`animate-bounce fill-current  h-4 w-4`}
          style={{ animationDelay: `${ind * 100}ms` }}
        />
      ))}
    </div>
  );
};

const Chat = () => {
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
        {isThinking && <Bubble text={<PulsingDots />} isMe={false} />}
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

const Wrapper = () => {
  const { id } = useParams();
  const { isChatValid } = useGetChatList();
  const validity = useMemo(() => isChatValid(id), [id, isChatValid]);

  if (!validity) {
    return <div>Invalid Chat</div>;
  }

  return (
    <>
      <Chat />
    </>
  );
};

export default Wrapper;
