import { DynamicField } from '@/components/profile/DynamicField';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import React from 'react';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      phone: '',
      dob: '',
      address: {
        country: '',
        state: '',
        city: '',
        postalCode: '',
        street: '',
        line2: ''
      }
    }
  });

  const fieldGroups = [
    {
      title: 'Personal',
      layout: 'sm:grid-cols-2',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', autoComplete: 'given-name' },
        { name: 'lastName', label: 'Last Name', type: 'text', autoComplete: 'family-name' },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
        { name: 'dob', label: 'Date of Birth', type: 'date' }
      ]
    },
    {
      title: 'Contact',
      layout: 'sm:grid-cols-2',
      fields: [
        { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'tel', autoComplete: 'tel' }
      ]
    },
    {
      title: 'Address',
      layout: 'sm:grid-cols-3',
      fields: [
        { name: 'address.country', label: 'Country', type: 'text', autoComplete: 'country-name' },
        {
          name: 'address.state',
          label: 'State / Province',
          type: 'text',
          autoComplete: 'address-level1'
        },
        { name: 'address.city', label: 'City', type: 'text', autoComplete: 'address-level2' },
        {
          name: 'address.postalCode',
          label: 'Postal Code',
          type: 'text',
          autoComplete: 'postal-code'
        },
        {
          name: 'address.street',
          label: 'Street',
          type: 'text',
          className: 'sm:col-span-2',
          autoComplete: 'address-line1'
        }
      ]
    }
  ];

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <section className="min-h-screen ubuntu-font">
      <div className="container mx-auto p-4 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-xl font-semibold">Account Information</h3>
          <p className="text-xs text-gray-600">Account created on Date, time. </p>
        </div>

        {/* Profile Pic */}
        <Card>
          <CardContent className="flex flex-col gap-2">
            <h4 className="text-md font-semibold">Profile Picture</h4>
            <div className="flex flex-row items-center gap-3">
              <img
                src="https://miro.medium.com/v2/resize:fit:1024/1*aDmhHAOamKqEgZJpIIshYg.jpeg"
                alt="Profile Picture"
                className="w-18 h-18 rounded-full"
              />
              <Button
                variant="ghost"
                className="w-[68px] bg-black text-white hover:bg-gray-700 cursor-pointer">
                Change
              </Button>
              <Button
                variant="ghost"
                className="w-[68px] bg-black text-white hover:bg-gray-700 cursor-pointer">
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Details Form */}
        <Card>
          <CardContent>
            <Form {...form}>
              <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                {fieldGroups.map((group) => (
                  <div key={group.title} className="space-y-4">
                    <h4 className="text-md font-semibold tracking-wide">{group.title}</h4>
                    <div className={`grid gap-4 ${group.layout}`}>
                      {group.fields.map((f) => (
                        <DynamicField key={f.name} config={f} form={form} />
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
                    className="bg-black text-white hover:bg-gray-700 cursor-pointer">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Profile;
