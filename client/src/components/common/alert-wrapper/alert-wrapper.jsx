import { Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction
} from '../../ui/alert-dialog';
import { cn } from '@/lib/utils';

const AlertWrapper = ({
  children,
  onAction = () => {},
  title,
  description,
  actionText,
  cancelText,
  pendingText,
  isPending = false,
  actionClassName
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} className={cn('cursor-pointer')}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={onAction}
            className={cn('text-white', actionClassName)}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? pendingText : actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertWrapper;
