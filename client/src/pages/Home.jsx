import React from 'react';
import Banner from '@/components/home/banner';
import ProductsCard from '@/components/home/ProductsCard';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section>
        <Banner />
      </section>
      <section className="ubuntu-font">
        <ProductsCard />
      </section>
    </div>
  );
};

export default Home;
