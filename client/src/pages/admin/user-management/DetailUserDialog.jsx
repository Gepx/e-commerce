// components/dialogs/DetailUserDialog.js

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Eye, User } from 'lucide-react';
import { useState } from 'react';
import InfoField from '@/components/info-field/InfoField';

const DetailUserDialog = ({ user }) => {
  const [open, setOpen] = useState(false);

  const formatDateTime = (d) =>
    d
      ? new Date(d).toLocaleString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      : null;

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : null;

  const addresses = user?.addresses?.length > 0 ? user.addresses : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="icon" className="cursor-pointer">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Detail</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Details */}
          <div className="flex items-center space-x-4">
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
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-foreground">
                {user?.firstName || user?.lastName
                  ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
                  : user.username}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h3 className="mb-4 text-md font-semibold">Account Information</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <InfoField label="Username" value={user?.username} />
              <InfoField
                label="Role"
                value={user?.role && <Badge variant="outline">{user.role}</Badge>}
                capitalize
              />
              <InfoField label="Provider" value={user?.provider} capitalize />
              <InfoField label="Account Created" value={formatDateTime(user?.createdAt)} />
            </div>
          </div>

          <Separator />

          {/* Personal Info */}
          <div>
            <h3 className="mb-4 text-md font-semibold">Personal Details</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <InfoField label="First Name" value={user?.firstName} />
              <InfoField label="Last Name" value={user?.lastName} />
              <InfoField label="Gender" value={user?.gender} capitalize />
              <InfoField label="Date of Birth" value={formatDate(user?.dob)} />
            </div>
          </div>

          {/* Addresses */}
          {addresses.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="mb-2 text-md font-semibold">Addresses</h3>
                <Accordion type="single" collapsible className="w-full">
                  {addresses.map((address, index) => (
                    <AccordionItem value={`item-${index}`} key={address.id}>
                      <AccordionTrigger>
                        Address {index + 1}{' '}
                        {address.isPrimary && <Badge className="ml-2">Primary</Badge>}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2 text-sm">
                        <p>
                          <strong>Street:</strong> {address.street}
                        </p>
                        <p>
                          <strong>City:</strong> {address.city}
                        </p>
                        <p>
                          <strong>State:</strong> {address.state ?? 'N/A'}
                        </p>
                        <p>
                          <strong>Postal Code:</strong> {address.postalCode ?? 'N/A'}
                        </p>
                        <p>
                          <strong>Country:</strong> {address.country}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailUserDialog;
