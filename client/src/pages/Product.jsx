import { useParams } from 'react-router-dom';
import {
  ProductProvider,
  useProductContext
} from '@/components/features/products/context/ProductContext';
import ProductMainContent from '../components/features/products/components/sections/ProductMainContent';
import ProductSidebar from '../components/features/products/components/sections/ProductSidebar';
import { Loader2 } from 'lucide-react';

const Product = () => {
  const { id } = useParams();

  return (
    <ProductProvider productId={id}>
      <ProductContent />
    </ProductProvider>
  );
};

const ProductContent = () => {
  const { isLoading, isError, product } = useProductContext();

  if (isLoading)
    return (
      <Loader2 className="w-10 h-10 animate-spin min-h-screen flex items-center justify-center" />
    );

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">Error loading product.</div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:w-[95%] md:px-0 mx-auto mt-5 flex flex-col lg:flex-row gap-6">
        <ProductMainContent />
        <ProductSidebar />
      </div>
    </div>
  );
};

export default Product;
