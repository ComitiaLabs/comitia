import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import useGetChat from '@/hook/useGetChat';
import useGetChatList from '@/hook/useGetChatList';
import { cn } from '@/lib/utils';
import { ChevronUpCircleIcon, Dot, Loader2Icon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
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
            'max-w-[70%] bg-primary text-primary-foreground rounded-md p-3',
            !props.isMe && 'bg-secondary text-secondary-foreground',
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
  const ref = useRef<HTMLTextAreaElement>(null);
  const { chats, loading, send, isThinking, block } = useGetChat();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [block]);

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
      <ScrollArea>
        <div className="flex flex-col gap-2 pr-3">
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
          {/* <ScrollDown parentRef={ref} /> */}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex items-center pt-2">
        <Textarea
          autoFocus
          ref={ref}
          className="rounded-none rounded-l-lg"
          value={message}
          onChange={updateText}
          onKeyDown={handleKeyDown}
          disabled={block}
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
