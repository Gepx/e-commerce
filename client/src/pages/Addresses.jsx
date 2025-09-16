import { ProfileProvider } from '@/components/features/profile/context/ProfileContext';
import Loading from '@/components/common/loading/Loading';
<<<<<<< HEAD
import { lazy, Suspense } from 'react';
=======
>>>>>>> 669ba0973271f3cba7c9d9a84f31ec8f27c95cf2

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
