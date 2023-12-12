import { fetchProtocol } from '@/lib/axios.ts';
import { handleAuth } from '@/lib/web5Tools';
import { didAtom, protocolAtom } from '@/store/index.ts';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const Login = () => {
  const [did, setDID] = useAtom(didAtom);
  const [protocol, setProtocol] = useAtom(protocolAtom);

  useEffect(() => {
    fetchProtocol(setProtocol);
  }, [setProtocol]);

  const handleDIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDID(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!protocol) {
        console.error('Protocol is not defined');
        return;
      }

      await handleAuth(protocol, did);
    } catch (error) {
      console.error('Could not get web5 instance', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="did">DID:</label>
        <input
          type="text"
          id="did"
          value={did}
          onChange={handleDIDChange}
          required
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
