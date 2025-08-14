import React, { useMemo, useState } from 'react';
import data from '@/json/productDummy.json';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { FilterIcon } from 'lucide-react';
import { Button } from '../ui/button';
import PaginationComponent from '../pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const ProductsCard = () => {
  const pageSize = 15;
  const products = data.products;

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(data.products.length / pageSize);

  const paginatedProducts = useMemo(() => {
    const startPage = (currentPage - 1) * pageSize;
    return products.slice(startPage, startPage + pageSize);
  }, [products, currentPage]);

  const uniqueCategories = [...new Set(products.map((product) => product.productCategory))];
  const categories = uniqueCategories.map((category) => {
    const count = products.filter((p) => p.productCategory === category).length;
    return { category, count };
  });
  return (
    <div className="w-[calc(95%-1rem)] md:w-[95%] mx-auto grid grid-cols-1 md:grid-cols-5 gap-2">
      <Card className="col-span-1 h-fit p-4">
        <div className="flex  items-center gap-2">
          <FilterIcon className="w-6 h-6" />
          <h2 className="text-2xl font-semibold">Filter</h2>
        </div>
        <CardContent className="p-0 flex flex-col gap-4">
          <div>
            <CardTitle className="text-lg font-semibold">Categories</CardTitle>
            {categories.map((c) => (
              <div className="flex items-center justify-between" key={c.category}>
                <div className="flex items-center gap-2">
                  <Checkbox id={`cat-${c.category}`} className="w-4 h-4" />
                  <label htmlFor={`cat-${c.category}`}>{c.category}</label>
                </div>
                <span>{c.count}</span>
              </div>
            ))}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Price</CardTitle>
            <div className="flex items-center gap-2">
              <Input type="number" placeholder="Min Price" />
              -
              <Input type="number" placeholder="Max Price" />
            </div>
            <Button className="w-full bg-black text-white hover:bg-gray-700 cursor-pointer mt-4">
              Apply
            </Button>
          </div>

          <div>
            <CardTitle className="text-lg font-semibold">Rating</CardTitle>
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="flex items-center gap-2" key={index}>
                <Checkbox id={`rating-${index}`} className="w-4 h-4" />
                <label htmlFor={`rating-${index}`}>
                  {'⭐'.repeat(index + 1) + (index !== 4 ? 'higher' : ' ')}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="col-span-4 grid grid-cols-2 lg:grid-cols-5 gap-4">
        {paginatedProducts.map((product) => (
          <Card
            key={product.productId}
            className="w-fit h-[284px] overflow-hidden p-0 border-none gap-0 cursor-pointer flex flex-col"
            onClick={() => navigate(`/product/${product.productId}`)}>
            <div className="w-[180px] h-[180px] overflow-hidden">
              <img
                src="https://miro.medium.com/v2/resize:fit:1024/1*aDmhHAOamKqEgZJpIIshYg.jpeg"
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="flex flex-col w-[180px] p-2 justify-between flex-1">
              <CardTitle className="font-normal">
                <p className="text-sm line-clamp-2">{product.productName}</p>
              </CardTitle>
              <CardDescription>
                <h4 className="text-lg font-semibold line-clamp-1">{`Rp${product.productPrice.toLocaleString('id-ID')}`}</h4>
              </CardDescription>

              <CardFooter className="p-0 mt-auto">
                <p className="text-sm text-gray-500">⭐{product.productStar}</p>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="col-span-5 flex justify-center mb-10">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
        />
      </div>
    </div>
  );
};

export default ProductsCard;
