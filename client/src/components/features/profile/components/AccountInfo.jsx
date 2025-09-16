import ProfileHeader from '@/components/features/profile/components/sections/ProfileHeader';
import ProfilePictureSection from '@/components/features/profile/components/sections/ProfilePictureSection';
import ProfileFormSection from '@/components/features/profile/components/sections/ProfileFormSection';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AccountInfo = () => {
  const { loading: isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        Loading...
      </div>
    );
  }
  return (
    <section className="min-h-screen ubuntu-font">
      <div className="container mx-auto p-4 flex flex-col gap-4">
        <ProfileHeader title="Account Information" subtitle="" />
        <ProfilePictureSection />
        <ProfileFormSection />
      </div>
    </section>
  );
};

export default AccountInfo;
