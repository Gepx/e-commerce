import { Button } from '@/components/ui/button';
import AddressCard from './AddressCard';
import AddressDialog from '@/components/features/profile/components/AddressDialog';
import { useProfileContext } from '@/components/features/profile/context/ProfileContext';
import { Loader2 } from 'lucide-react';

const AddressList = () => {
  const {
    addresses,
    isLoading,
    isError,
    dialogOpen,
    editingId,
    dialogValues,
    handleAddNew,
    handleEdit,
    handleDialogOpenChange,
    handleSubmitDialog,
    setAsDefault,
    deleteAddress
  } = useProfileContext();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        Loading Addresses...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-red-600">Failed to Load Addresses</h3>
        <p className="text-muted-foreground">
          {isError.message || 'Please try refreshing the page.'}
        </p>
      </div>
    );
  }

  return (
    <section className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Addresses</h3>
        <Button
          className="bg-black text-white hover:bg-gray-700 cursor-pointer"
          onClick={handleAddNew}>
          Add Address
        </Button>
      </div>

      <div className="text-center">
        {!isLoading && addresses.length === 0 && (
          <p className="text-sm text-muted-foreground">No addresses set.</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {addresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            onEdit={handleEdit}
            onDelete={deleteAddress}
            onSetDefault={setAsDefault}
          />
        ))}
      </div>

      <AddressDialog
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        initialValues={dialogValues}
        onSubmit={handleSubmitDialog}
        title={editingId ? 'Edit Address' : 'Add Address'}
      />
    </section>
  );
};

export default AddressList;
