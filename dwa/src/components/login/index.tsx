import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { fetchProtocol } from '@/lib/axios.ts';
import { handleAuth } from '@/lib/web5Tools';
import { paths } from '@/router';
import { didAtom, protocolAtom } from '@/store/index.ts';
import { type VariantProps } from 'class-variance-authority';
import { useAtom, useSetAtom } from 'jotai';
import { Loader2, MonitorSmartphone, Wallet } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';

const LoginCard = () => {
  const setRealDID = useSetAtom(didAtom);
  const [protocol, setProtocol] = useAtom(protocolAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toastError = useCallback(
    (err?: unknown) => {
      console.error(err);

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please refresh the page or try again later'
      });
    },
    [toast]
  );

  useEffect(() => {
    fetchProtocol(setProtocol);
  }, [setProtocol]);

  const handleLocalLogin = async () => {
    try {
      setLoading(true);
      if (!protocol) {
        toastError('Protocol is not defined. Please refresh the page');
        return;
      }

      await handleAuth(protocol, setRealDID);
      navigate(paths.chat);
    } catch (error) {
      toastError('An error has occured. Please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button className="col-span-full" onClick={handleLocalLogin}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <MonitorSmartphone className="mr-2 h-4 w-4 " />
            )}
            Local Agent
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" className="col-span-full" disabled>
            <Wallet className="mr-2 h-4 w-4 " />
            Web5 Wallet
          </Button>
        </div>
      </CardContent>
    </Card>
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
