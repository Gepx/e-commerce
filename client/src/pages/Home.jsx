import React from 'react';
import Banner from '@/components/home/banner';
import ProductsCard from '@/components/home/ProductsCard';
import Footer from '@/components/home/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section>
        <Banner />
      </section>
      <section className="ubuntu-font">
        <ProductsCard />
      </section>
      <section className="bg-gray-100 ubuntu-font p-8">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
