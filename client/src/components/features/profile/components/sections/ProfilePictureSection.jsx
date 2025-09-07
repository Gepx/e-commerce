import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';
import { useProfileContext } from '@/components/features/profile/context/ProfileContext';

const ProfilePictureSection = () => {
  const { user, uploading, removing, onFileChange, onRemoveAvatar } = useProfileContext();
  const inputImgRef = useRef(null);

  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <h4 className="text-md font-semibold">Profile Picture</h4>
        <div className="flex flex-row items-center gap-3">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="h-16 w-16 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
              <User className="h-8 w-8 text-slate-500" />
            </div>
          )}

          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputImgRef}
            onChange={onFileChange}
          />

          <Button
            type="button"
            variant="ghost"
            disabled={uploading}
            className="w-[68px] bg-black text-white hover:bg-gray-700 cursor-pointer"
            onClick={() => inputImgRef.current?.click()}>
            {uploading ? 'Uploading...' : 'Change'}
          </Button>

          <Button
            type="button"
            variant="ghost"
            disabled={removing}
            onClick={onRemoveAvatar}
            className="w-[68px] bg-black text-white hover:bg-gray-700 cursor-pointer">
            {removing ? 'Removing...' : 'Remove'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePictureSection;
