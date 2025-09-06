import { Table, TableHeader, TableBody, TableRow, TableHead } from '../../../ui/table';
import { Checkbox } from '../../../ui/checkbox';

const headers = [
  { label: '', key: 'checkbox' },
  { label: 'PRODUCT', key: 'product' },
  { label: 'QUANTITY', key: 'quantity' },
  { label: 'PRICE', key: 'price' }
];

const CartTableLayout = ({ children, cartItems, selectedItems, setSelectedItems }) => {
  const toggleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(cartItems.map((item) => item._id));
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[50px] text-center">
              <Checkbox
                checked={cartItems.length > 0 && selectedItems.length === cartItems.length}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            {headers.slice(1).map((header) => (
              <TableHead
                key={header.key}
                className={header.key === 'product' ? 'text-left' : 'text-center'}>
                {header.label}
              </TableHead>
            ))}
            <TableHead className="w-[120px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
};

export default CartTableLayout;
