import React from 'react';
import Banner from '@/components/home/banner';
import Footer from '@/components/home/Footer';
import Products from '@/components/features/products/Products';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section>
        <Banner />
      </section>
      <section className="ubuntu-font">
        <Products />
      </section>
      <section className="bg-gray-100 ubuntu-font p-8">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
