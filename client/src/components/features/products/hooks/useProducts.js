import { useQuery } from '@tanstack/react-query';
import productService from '@/components/features/products/services/productService';

const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAllProducts()
  });
};

export default useProducts;
