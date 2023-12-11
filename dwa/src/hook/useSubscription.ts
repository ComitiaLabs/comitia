import { useToast } from '@/components/ui/use-toast';
import { useCallback, useEffect } from 'react';
import { io } from 'socket.io-client';
import { env } from '../env';

const DID =
  'did:ion:EiA4OkU_l-Uh4x5DIlJNm4vn-CJGamggG392zIHIEaAf7w:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoielpndXJWTS1qZy1jcEptN3A3QWNsak10UHhFUVJkY0hmR2VKaXNxWm9vUSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJiRC1mSlpPV2ZEZGNuU1gzUW0yOXZXanFTcE1zUElSRHB4R0VMcGhNNDZNIiwieSI6IkJEVVpGaGVmdklIWEFJV1kxZkZCX0xTRDNWb3Q5LWs3MDI3NHFoMFZzakUifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBSDVfRE1EaG9LWTZHZVdrTkFKTUM0VXhzSFpoZFR5SVpEbnNydktENWIxUSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpREwzNFVHN2hadE5vYlIwT1h4S0dPQkFSWC1Ta1hqbHJRNUFrMmZ3clRJcVEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUQ1aVh3aWNYNE96NE1PbFk5NHVFMmgzTlVrdjh3UU1fSHRWUG5ZcktIUS1RIn19';

const socket = io(env.VITE_WS_URL, {
  auth: {
    did: DID,
  },
});

const useSubscription = () => {
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
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
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
