import React, { useMemo, useState } from 'react';
import data from '@/json/productDummy.json';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import {
  FilterIcon,
  Heart,
  ShoppingBag,
  ShoppingCart,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Product = () => {
  const products = data.products;
  const product = products[0];

  const [qty, setQty] = useState(1);
  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);

  const vouchers = [
    { id: 1, title: '300k Discount', desc: 'Min. Purchase 50K', endsIn: '13 September 2025' },
    { id: 2, title: '1k Discount', desc: 'Min. Purchase 300k', endsIn: '13 September 2025' },
    { id: 3, title: '5% Cashback', desc: 'Min. Purchase 300k', endsIn: '13 September 2025' },
    { id: 4, title: '5% Cashback', desc: 'Min. Purchase 300k', endsIn: '13 September 2025' },
    { id: 5, title: '5% Cashback', desc: 'Min. Purchase 300k', endsIn: '13 September 2025' }
  ];

  const reviews = useMemo(
    () => [
      {
        id: 1,
        name: 'Black',
        date: 'May 23, 2025',
        rating: 5,
        text: 'Original product, highly recommended!'
      },
      { id: 2, name: 'Rani', date: 'May 20, 2025', rating: 5, text: 'Very fast delivery.' },
      { id: 3, name: 'Adi', date: 'May 18, 2025', rating: 4, text: 'Good, matches description.' },
      { id: 4, name: 'Dewi', date: 'May 17, 2025', rating: 5, text: 'Five-star product.' },
      { id: 5, name: 'Budi', date: 'May 15, 2025', rating: 3, text: 'Just okay.' },
      { id: 6, name: 'Sari', date: 'May 14, 2025', rating: 5, text: 'Excellent!' },
      { id: 7, name: 'Lutfi', date: 'May 12, 2025', rating: 4, text: 'Worth it.' },
      { id: 8, name: 'Nina', date: 'May 10, 2025', rating: 5, text: 'Secure packaging.' },
      { id: 9, name: 'Rio', date: 'May 9, 2025', rating: 5, text: 'Awesome.' },
      { id: 10, name: 'Doni', date: 'May 7, 2025', rating: 1, text: 'Not for me.' },
      { id: 11, name: 'Hana', date: 'May 5, 2025', rating: 2, text: 'Average.' },
      { id: 12, name: 'Tari', date: 'May 3, 2025', rating: 5, text: 'The best.' }
    ],
    []
  );

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => (counts[r.rating] = (counts[r.rating] || 0) + 1));
    return counts;
  }, [reviews]);

  const totalRatings = reviews.length || 1;
  const averageRating =
    (5 * ratingCounts[5] +
      4 * ratingCounts[4] +
      3 * ratingCounts[3] +
      2 * ratingCounts[2] +
      1 * ratingCounts[1]) /
    totalRatings;

  // Filter (rating only)
  const [ratingOpen, setRatingOpen] = useState(true);

  return (
    <div className="min-h-screen">
      <div className="w-[calc(95%-1rem)] md:w-[95%] mx-auto mt-5 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-9 flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 items-start">
            {/* Images */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <Card className="p-0 m-0 overflow-hidden aspect-[4/3]">
                <img
                  src={product.productImages?.[0] || 'https://picsum.photos/800/600'}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </Card>
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Card key={i} className="p-0 m-0 overflow-hidden aspect-square">
                    <img
                      src={
                        product.productImages?.[i % (product.productImages?.length || 1)] ||
                        'https://picsum.photos/200/200'
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </Card>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <h1 className="text-2xl font-bold leading-tight">{product.productName}</h1>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <ShoppingBag className="w-4 h-4" />
                  154 orders
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {averageRating.toFixed(1)} ({totalRatings} reviews)
                </span>
              </div>

              <span className="text-2xl font-semibold">{`Rp${product.productPrice.toLocaleString('id-ID')}`}</span>

              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-500">Color</div>
                <div className="flex items-center gap-2 flex-wrap">
                  {['Blue', 'Red', 'Green', 'Yellow', 'Purple', 'Orange'].map((c) => (
                    <Button key={c} variant="outline" className="cursor-pointer h-9 px-4">
                      {c}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-500">Size</div>
                <div className="flex items-center gap-2 flex-wrap">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                    <Button key={s} variant="outline" className="cursor-pointer h-9 px-4">
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {vouchers.length > 0 && (
            <section className="h-[120px]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Vouchers</h2>
                <span className="text-sm text-gray-500">{vouchers.length} available</span>
              </div>
              <div className="flex gap-3 overflow-x-auto h-[96px] scroll-smooth snap-x snap-mandatory">
                {vouchers.map((v) => (
                  <Card
                    key={v.id}
                    className="min-w-[220px] h-full p-3 flex items-center justify-between">
                    <div className="min-w-0 flex items-center gap-5">
                      <div>
                        <p className="font-semibold truncate">{v.title}</p>
                        <p className="text-xs text-gray-500 truncate">{v.desc}</p>
                        <p className="text-xs text-gray-500 truncate">Ends {v.endsIn}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-black text-white hover:bg-gray-700 cursor-pointer">
                        Use
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Product Details */}
          <div>
            <Card className="shadow-lg h-fit">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Specifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium text-gray-700 w-1/3">Brand</td>
                          <td className="py-2 text-gray-600">Samsung</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium text-gray-700">Weight</td>
                          <td className="py-2 text-gray-600">500g</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium text-gray-700">Material</td>
                          <td className="py-2 text-gray-600">Premium Cotton</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium text-gray-700">Origin</td>
                          <td className="py-2 text-gray-600">Indonesia</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium text-gray-700">Warranty</td>
                          <td className="py-2 text-gray-600">1 Year Official</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      {product.productDescription} Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-4">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews */}
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Star className="w-10 h-10 fill-yellow-500 text-yellow-500" />
                  <p className="text-2xl font-bold">{averageRating.toFixed(1)} / 5.0</p>
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  {[5, 4, 3, 2, 1].map((r) => {
                    const pct = Math.round((ratingCounts[r] / totalRatings) * 100);
                    return (
                      <div className="flex items-center gap-3" key={r}>
                        <span className="w-4 text-sm">{r}</span>
                        <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-10 text-right text-sm text-gray-600">
                          {ratingCounts[r]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Filter + Review list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4 md:col-span-1 h-fit">
                <div className="flex items-center gap-2 mb-2">
                  <FilterIcon className="w-4 h-4" />
                  <h4 className="text-lg font-semibold">Filter Reviews</h4>
                </div>

                <div className="flex flex-col gap-2">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setRatingOpen((s) => !s)}>
                    <CardTitle className="text-base font-semibold">Rating</CardTitle>
                    <button type="button" className="p-1">
                      {ratingOpen ? (
                        <ChevronUp className="w-4 h-4 cursor-pointer hover:bg-gray-200 rounded-full" />
                      ) : (
                        <ChevronDown className="w-4 h-4 cursor-pointer hover:bg-gray-200 rounded-full" />
                      )}
                    </button>
                  </div>
                  {ratingOpen && (
                    <div className="mt-2 flex flex-col gap-2">
                      {[5, 4, 3, 2, 1].map((n) => (
                        <div className="flex items-center gap-2" key={n}>
                          <Checkbox id={`rating-${n}`} />
                          <label
                            htmlFor={`rating-${n}`}
                            className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            {n}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-4 md:col-span-2">
                <div className="h-[300px] overflow-y-auto space-y-4 pr-1">
                  {reviews.map((r) => (
                    <div key={r.id} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://i.pravatar.cc/80?img=${(r.id % 70) + 1}`}
                          alt={r.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="text-xs">
                          <p className="font-bold">{r.name}</p>
                          <p className="font-light">{r.date}</p>
                        </div>
                      </div>
                      <p className="flex items-center gap-0.5 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < r.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </p>
                      <p className="text-sm font-medium mt-1">{r.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Sticky Checkout Coloumn */}
        <div className="lg:col-span-3">
          <Card className="sticky top-24 p-4 flex flex-col gap-3 shadow-lg">
            <p className="text-xl font-semibold">
              Subtotal: {`Rp${product.productPrice.toLocaleString('id-ID')}`}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="sm" className="px-3 cursor-pointer" onClick={dec}>
                  -
                </Button>
                <Input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
                  className="w-14 text-center border-0 focus-visible:ring-0 focus-visible:border-0 shadow-none"
                />
                <Button variant="ghost" size="sm" className="px-3 cursor-pointer" onClick={inc}>
                  +
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">Stock: 100</span>
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
              Buy Now
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold transition-all duration-200 cursor-pointer">
              <Heart className="w-5 h-5 mr-2" />
              Add to Wishlist
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Product;
