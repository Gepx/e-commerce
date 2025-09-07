import { Button } from '@/components/ui/button';
import AddressCard from './AddressCard';
import AddressDialog from '@/components/features/profile/components/AddressDialog';
import { useProfileContext } from '@/components/features/profile/context/ProfileContext';

const AddressList = () => {
  const {
    addresses,
    loading,
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
        {!loading && addresses.length === 0 && (
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
