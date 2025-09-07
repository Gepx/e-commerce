import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import userService from '@/components/features/profile/services/userService';

const useAvatar = (userId) => {
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: uploadAvatar } = useMutation({
    mutationFn: (file) => userService.updateUserAvatar(userId, file),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Avatar updated successfully');
      setUploading(false);
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to update avatar');
      setUploading(false);
    }
  });

  const { mutate: deleteAvatar } = useMutation({
    mutationFn: () => userService.removeUserAvatar(userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Avatar removed successfully');
      setRemoving(false);
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to remove avatar');
      setRemoving(false);
    }
  });

  const onFileChange = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file || !userId) return;

      setUploading(true);
      uploadAvatar(file);
      e.target.value = '';
    },
    [userId, uploadAvatar]
  );

  const onRemoveAvatar = useCallback(() => {
    if (!userId) return;
    setRemoving(true);
    deleteAvatar();
  }, [userId, deleteAvatar]);

  return {
    uploading,
    removing,
    onFileChange,
    onRemoveAvatar
  };
};

export default useAvatar;
