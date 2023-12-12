import RequestStatus from '@/lib/enums';
import { didAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';

const useIsAuthorized = () => {
  const did = useAtomValue(didAtom);
  const effectTriggeredRef = useRef(false);
  const [isSessionValid, setIsSessionValid] = useState<RequestStatus>(
    RequestStatus.UNKNOWN,
  );
  const fetchSessionValidation = useCallback(() => {
    if (did == undefined || did === '') {
      return RequestStatus.FALSE;
    }
    return RequestStatus.TRUE;
  }, [did]);

  useEffect(() => {
    if (typeof window !== 'undefined' && did !== undefined) {
      const fetchWrapper = () => {
        try {
          const isSessionValid = fetchSessionValidation();

          setIsSessionValid(isSessionValid);
        } catch {
          setIsSessionValid(RequestStatus.ERROR);
        }
      };

      /* istanbul ignore else -- @preserve */
      if (!effectTriggeredRef.current) {
        effectTriggeredRef.current = true;
        fetchWrapper();
      }
    }
  }, [fetchSessionValidation, did]);

  return isSessionValid;
};

export default useIsAuthorized;
