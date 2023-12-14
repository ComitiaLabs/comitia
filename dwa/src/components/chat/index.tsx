import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useGetChat from '@/hook/useGetChat';
import { cn } from '@/lib/utils';
import { ChevronUpCircleIcon, Dot, Loader2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import Placeholder from './placeholder';

interface IBubble {
  text: string;
  isMe: boolean;
}
const Bubble = (props: IBubble) => {
  const { text, isMe } = props;

  return (
    <div className={cn('flex justify-end', !isMe && 'justify-start')}>
      <div
        className={cn(
          'max-w-[70%] bg-primary text-primary-foreground rounded-md p-3 transition-all',
          !isMe && 'bg-white text-secondary-foreground'
        )}
      >
        {text.length <= 0 && <PulsingDots />}
        <Markdown remarkPlugins={[rehypeHighlight]}>{text}</Markdown>
      </div>
    </div>
  );
};

const PulsingDots = ({ count = 3 }) => {
  return (
    <div className="flex items-center justify-center gap-0">
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
  const { chats, loading, send } = useGetChat();
  const [message, setMessage] = useState('');

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
      <div className="h-full overflow-scroll overflow-x-hidden" ref={containerRef}>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader2Icon size={100} className="text-primary animate-[spin_3s_linear_infinite]" />
          </div>
        ) : chats.length <= 0 ? (
          <Placeholder />
        ) : (
          <div className="flex flex-col gap-2 pr-3">
            {chats.map((chat, ind) => {
              // TODO: add key
              return <Bubble key={ind} text={chat.message} isMe={chat.isMe} />;
            })}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center pt-2">
        <Textarea
          autoFocus
          ref={ref}
          className="rounded-none rounded-l-lg"
          placeholder="what is the meaning of life?"
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
            <ChevronUpCircleIcon className="w-4 h-4" />
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </Button>
      </form>
    </>
  );
};

export default Chat;
