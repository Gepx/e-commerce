import { ProfileProvider } from '@/components/features/profile/context/ProfileContext';
import AccountInfo from '@/components/features/profile/components/AccountInfo';
import { Suspense } from 'react';
import Loading from '@/components/common/loading/Loading';

const Profile = () => {
  return (
    <ProfileProvider>
      <Suspense fallback={<Loading />}>
        <AccountInfo />
      </Suspense>
    </ProfileProvider>
  );
};

export default Profile;
