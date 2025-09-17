import { useQuery } from '@tanstack/react-query';
import productService from '@/components/features/products/services/productService';
import { useSearchParams } from 'react-router-dom';

const useProducts = () => {
  const [params] = useSearchParams();
  const search = params.get('search') || undefined;

  return useQuery({
    queryKey: ['products', { search }],
    queryFn: () => productService.getAllProducts({ search })
  });
};

export default useProducts;
