import ProfileHeader from '@/components/features/profile/components/sections/ProfileHeader';
import ProfilePictureSection from '@/components/features/profile/components/sections/ProfilePictureSection';
import ProfileFormSection from '@/components/features/profile/components/sections/ProfileFormSection';

const AccountInfo = () => {
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
