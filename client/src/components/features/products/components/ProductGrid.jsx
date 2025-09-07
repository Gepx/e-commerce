import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <div className="col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
