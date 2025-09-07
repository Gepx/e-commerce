import Voucher from '../Voucher';
import { useProductContext } from '@/components/features/products/context/ProductContext';

const ProductVoucherSection = () => {
  const { vouchers } = useProductContext();

  return <Voucher vouchers={vouchers} />;
};

export default ProductVoucherSection;
