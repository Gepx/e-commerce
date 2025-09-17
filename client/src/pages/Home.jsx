import React from 'react';
import Banner from '@/components/home/Banner';
import Footer from '@/components/home/Footer';
import Products from '@/components/features/products/Products';
import Loading from '@/components/common/loading/Loading';
import { Suspense } from 'react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <div className="w-[calc(95%-1rem)] md:w-[95%] mx-auto flex flex-col gap-8 py-8">
          <Banner />
        </div>
        <section className="ubuntu-font">
          <Products />
        </section>
        <section className="bg-gray-100 ubuntu-font p-8">
          <Footer />
        </section>
      </Suspense>
    </div>
  );
};

export default Home;
