import React from 'react';
import Banner from '@/components/home/banner';
import Footer from '@/components/home/Footer';
import Products from '@/components/features/products/Products';
import Loading from '@/components/common/loading/Loading';
import { Suspense } from 'react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <section>
          <Banner />
        </section>
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
