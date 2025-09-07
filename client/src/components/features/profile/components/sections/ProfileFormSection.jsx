import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { DynamicField } from '@/components/features/profile/components/DynamicField';
import { PROFILE_FIELD_GROUPS } from '@/components/features/profile/constants/profileConstants';
import { useProfileContext } from '@/components/features/profile/context/ProfileContext';

const ProfileFormSection = () => {
  const navigate = useNavigate();
  const { form, handleSubmit, isUpdating, addresses } = useProfileContext();

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={handleSubmit}>
            {PROFILE_FIELD_GROUPS.map((group) => (
              <div key={group.title} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-semibold tracking-wide">{group.title}</h4>
                  {group.title === 'Address' && (
                    <div className="flex gap-2">
                      {!addresses || addresses.length === 0 ? (
                        <Button
                          type="button"
                          className="bg-black text-white hover:bg-gray-700 cursor-pointer"
                          onClick={() => navigate('/addresses?action=add')}>
                          Add Address
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => navigate('/addresses')}>
                          Manage Addresses
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                <div className={`grid gap-4 ${group.layout}`}>
                  {group.fields.map((field) => (
                    <DynamicField key={field.name} config={field} form={form} />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => form.reset()}
                className="cursor-pointer border-2">
                Reset
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-black text-white hover:bg-gray-700 cursor-pointer">
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileFormSection;
