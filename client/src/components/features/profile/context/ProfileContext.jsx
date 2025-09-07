import { createContext, useContext } from 'react';
import useProfile from '@/components/features/profile/hooks/useProfile';
import useAddresses from '@/components/features/profile/hooks/useAddresses';
import useAvatar from '@/components/features/profile/hooks/useAvatar';
import useProfileForm from '@/components/features/profile/hooks/useProfileForm';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const profileHook = useProfile();
  const addressesHook = useAddresses();
  const avatarHook = useAvatar(profileHook.userId);
  const formHook = useProfileForm(
    profileHook.user,
    addressesHook.defaultAddress,
    profileHook.updateUserProfile
  );

  const value = {
    ...profileHook,

    ...addressesHook,

    ...avatarHook,

    ...formHook
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within ProfileProvider');
  }
  return context;
};
