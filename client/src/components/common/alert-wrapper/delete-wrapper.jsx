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

const DeleteWrapper = ({
  children,
  onConfirm = () => {},
  title = 'Are You Sure want to Delete this data?',
  description = 'This Action cannot be undone. After deleting, the data will be permanently removed.',
  actionText = 'Delete',
  cancelText = 'Cancel',
  pendingText = 'Deleting...',
  isPending = false
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
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 cursor-pointer">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? pendingText : actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWrapper;
