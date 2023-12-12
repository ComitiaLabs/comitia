import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fetchProtocol } from '@/lib/axios.ts';
import { handleAuth } from '@/lib/web5Tools';
import { paths } from '@/router';
import { didAtom, protocolAtom } from '@/store/index.ts';
import { type VariantProps } from 'class-variance-authority';
import { useAtom, useSetAtom } from 'jotai';
import { Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCard = () => {
  const [did, setDID] = useState<string | undefined>(undefined);
  const setRealDID = useSetAtom(didAtom);
  const [protocol, setProtocol] = useAtom(protocolAtom);
  const [invalidDID, setInvalidDID] = useState('');
  const navigate = useNavigate();

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
      setRealDID(did);
      navigate(paths.chat);
    } catch (error) {
      console.error('Could not get web5 instance', error);
      setInvalidDID('An error occurred. Please try again later');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your DID below to access your chatbot
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="did">DID</Label>
            <Input
              id="did"
              type="text"
              placeholder="DID address"
              onChange={handleDIDChange}
              required
            />
            {invalidDID && (
              <span className="text-sm text-red-500">{invalidDID}</span>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" className="col-span-full" disabled>
              <Wallet className="mr-2 h-4 w-4 " />
              Web5 Wallet
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

interface ILogin {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  variant?: VariantProps<typeof buttonVariants>['variant'];
}
const Login = (props: ILogin) => {
  const { open, variant, setOpen } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant}>Login</Button>
      </DialogTrigger>

      <DialogContent className="p-0">
        <LoginCard />
      </DialogContent>
    </Dialog>
  );
};

export default Login;
