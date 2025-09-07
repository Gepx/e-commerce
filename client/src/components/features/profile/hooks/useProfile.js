import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import userService from '@/components/features/profile/services/userService';

const useProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?._id;

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (payload) => userService.updateUserProfile(userId, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user'] }),
        queryClient.invalidateQueries({ queryKey: ['addresses'] })
      ]);
      toast.success('Profile updated successfully');
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to update profile');
    }
  });

  const updateUserProfile = async (profileData) => {
    if (!userId) return;

    const cleanData = Object.fromEntries(
      Object.entries(profileData).filter(([_, value]) => value !== undefined)
    );

    updateProfile(cleanData);
  };

  return {
    user,
    userId,
    updateUserProfile,
    isUpdating
  };
};

export default useProfile;
