import { Button } from '@/components/ui/button';
import useGetChat from '@/hook/useGetChat';
import { cn } from '@/lib/utils';
import { ChevronUpCircleIcon, Dot, Loader2Icon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import Placeholder from './placeholder';
import { inputFieldAtom, inputFieldRefAtom } from '@/store';
import { useAtom } from 'jotai';
import { Textarea } from '../ui/textarea';

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
          'max-w-[70%] bg-primary text-primary-foreground rounded-md p-3 transition-all whitespace-pre-wrap',
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

  const { chats, loading, send, loadingMessages } = useGetChat();
  const [message, setMessage] = useAtom(inputFieldAtom);
  const [, setInputFieldRef] = useAtom(inputFieldRefAtom);

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
      setInputFieldRef(ref.current);
      ref.current.focus();
    }
  }, [loading, setInputFieldRef]);

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
        className="h-full pr-1 overflow-scroll overflow-x-hidden md:no-scrollbar"
        ref={containerRef}
      >
        {loadingMessages ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2Icon size={100} className="text-primary animate-[spin_3s_linear_infinite]" />
          </div>
        ) : chats.length <= 0 ? (
          <Placeholder />
        ) : (
          <div className="flex flex-col gap-2 ">
            {chats.map((chat, ind) => {
              // TODO: add key
              return <Bubble key={ind} text={chat.message} isMe={chat.isMe} />;
            })}
          </div>
        )}

        <div className="h-4" />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center">
        <Textarea
          autoFocus
          ref={ref}
          className="rounded-none rounded-l-lg"
          placeholder="Ask a question..."
          value={message}
          onChange={updateText}
          onKeyDown={handleKeyDown}
          disabled={loading}
          maxRows={4}
        />

        <Button
          variant="default"
          size="icon"
          className="h-full rounded-none rounded-r-lg aspect-square peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
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
