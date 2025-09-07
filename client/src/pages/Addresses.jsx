import { ProfileProvider } from '@/components/features/profile/context/ProfileContext';
import Address from '@/components/features/profile/components/Address';

const Addresses = () => {
  return (
    <ProfileProvider>
      <Address />
    </ProfileProvider>
  );
};

export default Addresses;
