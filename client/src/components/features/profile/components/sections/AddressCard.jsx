import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Bookmark, Dot, Ellipsis, Pencil, SquareUserRound, Trash } from 'lucide-react';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  return (
    <Card
      className={`border rounded-xl shadow-sm overflow-hidden p-0 flex flex-col gap-1 h-[160px] ${
        address.isDefault ? 'ring-2 ring-primary' : 'hover:shadow-md transition'
      }`}>
      {/* Header */}
      <CardHeader className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b-1">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-gray-600" />
          <CardTitle className="text-sm font-semibold text-gray-700">
            {address.label}
            {address.isDefault && (
              <span className="ml-2 rounded-md bg-primary px-2 py-0.5 text-[10px] text-white">
                Default
              </span>
            )}
          </CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Ellipsis className="w-4 h-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-md rounded-md" align="end">
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2"
              onClick={() => onEdit(address)}>
              <Pencil className="w-4 h-4 text-blue-500" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2"
              onClick={() => onDelete(address._id)}>
              <Trash className="w-4 h-4 text-red-500" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {!address.isDefault && (
              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-2"
                onClick={() => onSetDefault(address._id)}>
                Make Default
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-4 text-gray-700 h-full">
        <p className="text-sm leading-relaxed">
          {address.street} {address.city}, {address.province} {address.postalCode}
        </p>

        <div>
          <Separator className="my-2" />
          <div className="flex items-center gap-2 text-gray-600">
            <SquareUserRound className="w-4 h-4" />
            <span className="text-sm">{address.recipientName}</span>
            <Dot className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{address.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
