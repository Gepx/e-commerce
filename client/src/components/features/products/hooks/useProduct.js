import { useQuery } from '@tanstack/react-query';
import productService from '../services/productService';

const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id
  });
};

export default useProduct;
