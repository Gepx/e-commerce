import { Loader2 } from 'lucide-react';
import useProducts from '@/components/features/products/hooks/useProducts';
import useProductFilters from '@/components/features/products/hooks/useProductFilters';
import usePagination from '@/components/features/products/hooks/usePagination';
import { lazy, Suspense } from 'react';

const ProductFilters = lazy(() => import('./components/ProductFilters'));
const ProductGrid = lazy(() => import('./components/ProductGrid'));
const PaginationComponent = lazy(() => import('@/components/common/pagination/Pagination'));

const Products = () => {
  const { data: products, isLoading, isError } = useProducts();
  const productList = products?.products || [];

  const {
    categories,
    filteredProducts,
    selectedCategories,
    priceRange,
    selectedRatings,
    toggleCategory,
    updatePriceRange,
    toggleRating,
    clearFilters
  } = useProductFilters(productList);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    setCurrentPage
  } = usePagination(filteredProducts, 15);

  if (isLoading) return <Loader2 className="w-10 h-10 animate-spin" />;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div className="w-[calc(95%-1rem)] md:w-[95%] mx-auto flex flex-col md:grid grid-cols-1 md:grid-cols-5 gap-2">
      <Suspense fallback={<Loader2 className="w-10 h-10 animate-spin" />}>
        <ProductFilters
          categories={categories}
          selectedCategories={selectedCategories}
          priceRange={priceRange}
          selectedRatings={selectedRatings}
          onToggleCategory={toggleCategory}
          onUpdatePriceRange={updatePriceRange}
          onToggleRating={toggleRating}
          onClearFilters={clearFilters}
        />

        <ProductGrid products={paginatedProducts} />

        <div className="col-span-5 flex justify-center mb-10">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default Products;
