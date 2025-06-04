import React from 'react';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div>
      {/* <h1>أهلاً وسهلاً في متجر التليفونات</h1>
      <p>استعرض جميع التليفونات المتاحة لدينا:</p> */}
      
      <Banner />
      <ProductList />

    </div>
  );
}

export default Home;