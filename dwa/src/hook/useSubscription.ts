import { useToast } from '@/components/ui/use-toast';
import { socket } from '@/lib/ws';
import { didAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect } from 'react';

const useSubscription = () => {
  const did = useAtomValue(didAtom);
  const { toast } = useToast();

  const toastError = useCallback(
    (err?: unknown) => {
      console.error(err);

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please refresh the page or try again later',
      });
    },
    [toast],
  );

  useEffect(() => {
    socket.auth = { did };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [did]);

  useEffect(() => {
    socket.on('connection', function () {
      console.log('client connected');
    });

    socket.on('connect_error', function (err: Error) {
      toastError(err);
    });

    socket.on('connect_timeout', function (err: Error) {
      toastError(err);
    });

    socket.on('error', function (err: Error) {
      toastError(err);
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('connect_timeout');
      socket.off('error');
    };
  }, [toastError]);

  return { socket };
};

export default useSubscription;
