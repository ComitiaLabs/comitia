import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useGetChat from '@/hook/useGetChat';
import useGetChatList from '@/hook/useGetChatList';
import { cn } from '@/lib/utils';
import { ChevronUpCircleIcon, Dot, Loader2Icon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

interface IBubble {
  text: string;
  isMe: boolean;
}
const Bubble = (props: IBubble) => {
  const { text, isMe } = props;

  return (
    <>
      <div className={cn('flex justify-end', !isMe && 'justify-start')}>
        <div
          className={cn(
            'max-w-[70%] bg-primary text-primary-foreground rounded-md p-3 transition-all',
            !isMe && 'bg-secondary text-secondary-foreground',
          )}
        >
          {text.length <= 0 && <PulsingDots />}
          {text}
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
  const ref = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { chats, loading, send, isThinking } = useGetChat();
  const [message, setMessage] = useState('what is the meaning of life?');

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [loading]);

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!message || message.length < 1) return;

    send(message);
    setMessage('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event?.preventDefault();
      handleSubmit();
    }
  };

  const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div
        className="h-full overflow-scroll overflow-x-hidden"
        ref={containerRef}
      >
        <div className="flex flex-col gap-2 pr-3">
          {chats.map((chat, ind) => {
            // TODO: add key
            return <Bubble key={ind} text={chat.message} isMe={chat.isMe} />;
          })}
          {isThinking && <PulsingDots />}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center pt-2">
        <Textarea
          autoFocus
          ref={ref}
          className="rounded-none rounded-l-lg"
          value={message}
          onChange={updateText}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <Button
          variant="default"
          size="icon"
          className="h-full rounded-none rounded-r-lg"
          disabled={loading || !message || message.length < 1}
          type="submit"
        >
          {!loading ? (
            <ChevronUpCircleIcon className="h-4 w-4" />
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </Button>
      </form>
    </>
  );
};

const Wrapper = () => {
  const { id } = useParams();
  const { isChatValid } = useGetChatList();
  const validity = useMemo(() => isChatValid(id), [id, isChatValid]);

  if (!validity) {
    return <span>Please select a chat from the sidebar</span>;
  }

  return (
    <>
      <Chat />
    </>
  );
};

export default Wrapper;
