import { ProfileProvider } from '@/components/features/profile/context/ProfileContext';
import Loading from '@/components/common/loading/Loading';
import { lazy, Suspense } from 'react';

const Address = lazy(() => import('@/components/features/profile/components/Address'));

const Addresses = () => {
  return (
    <ProfileProvider>
      <Suspense fallback={<Loading />}>
        <Address />
      </Suspense>
    </ProfileProvider>
  );
};

export default Addresses;
