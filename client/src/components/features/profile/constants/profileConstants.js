export const PROFILE_FIELD_GROUPS = [
  {
    title: 'Personal',
    layout: 'sm:grid-cols-2',
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', autoComplete: 'given-name' },
      { name: 'lastName', label: 'Last Name', type: 'text', autoComplete: 'family-name' },
      { name: 'username', label: 'Username', type: 'text' },
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' }
        ]
      },
      { name: 'dob', label: 'Date of Birth', type: 'date' }
    ]
  },
  {
    title: 'Contact',
    layout: 'sm:grid-cols-2',
    fields: [
      { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', disabled: true },
      {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'tel',
        autoComplete: 'tel',
        disabled: true
      }
    ]
  },
  {
    title: 'Address',
    layout: 'sm:grid-cols-3',
    fields: [
      {
        name: 'address.province',
        label: 'Province/State',
        type: 'text',
        autoComplete: 'address-level1',
        disabled: true
      },
      {
        name: 'address.city',
        label: 'City',
        type: 'text',
        autoComplete: 'address-level2',
        disabled: true
      },
      {
        name: 'address.postalCode',
        label: 'Postal Code',
        type: 'text',
        autoComplete: 'postal-code',
        disabled: true
      },
      {
        name: 'address.street',
        label: 'Street',
        type: 'text',
        className: 'sm:col-span-2',
        autoComplete: 'address-line1',
        disabled: true
      }
    ]
  }
];

export const EMPTY_ADDRESS = {
  id: '',
  label: '',
  recipientName: '',
  phone: '',
  street: '',
  city: '',
  province: '',
  postalCode: '',
  isDefault: false
};
