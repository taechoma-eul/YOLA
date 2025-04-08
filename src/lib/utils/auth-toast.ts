import { toast } from '@/lib/hooks/use-toast';

export const authToast = (message: string) => {
  return toast({
    description: message,
    variant: 'destructive'
  });
};
