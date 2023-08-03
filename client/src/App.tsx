import React from 'react';
import { Home } from './Pages/home/Home';
import { Routes, Route} from 'react-router-dom';
import { PageNotFound } from './Pages/PageNotFound';
import { Categories } from './Pages/Categorires/mainCategory/Categories';
import { About } from './Pages/About/About';
import { Header } from './component/header/Header';
import { Footer } from './component/footer/Footer';
import { Contact } from './Pages/Contact/Contact';
import { ProductList } from './Pages/ProductList/ProductList';
import { Category } from './utils/Categoris';
import { Basket } from './component/Basket/Basket';

function App() {
 
  return (
    <> 
    <Header/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/categories/technology' element={<ProductList category={Category.Technology} />} />
      <Route path='/categories/clothes' element={<ProductList category={Category.Clothes} />} />
      <Route path='/categories/food' element={<ProductList category={Category.Food} />} />
      <Route path='/categories/furniture' element={<ProductList category={Category.Furniture} />} />
      <Route path='/categories/garden' element={<ProductList category={Category.Garden} />} />
      <Route path='/categories/health' element={<ProductList category={Category.Health} />} />
      <Route path='/categories/sport' element={<ProductList category={Category.Sport} />} />
      <Route path='/categories/home' element={<ProductList category={Category.Home} />} />
      <Route path='user/basket' element={<Basket />} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<PageNotFound />} />
      <Route path='/contact' element={ <Contact />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
