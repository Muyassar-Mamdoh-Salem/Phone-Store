import React from 'react';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import ContactUs from '../components/ContactUs';

const Home = () => {
  return (
    <div>
      {/* <h1>أهلاً وسهلاً في متجر التليفونات</h1>
      <p>استعرض جميع التليفونات المتاحة لدينا:</p> */}
      <div id="top">
  {/* باقي الصفحة */}
</div>

      <Banner />
      <ProductList />
      <ContactUs />

    </div>
  );
}

export default Home;