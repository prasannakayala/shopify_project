import React,{ Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'

const LazyFooter= React.lazy(()=> import('./components/Footer/Footer'))
const LazyLogin= React.lazy(()=> import('./components/Login/Login'))
const LazyRegister= React.lazy(()=> import('./components/Register/Register'))
const LazyMenu= React.lazy(()=> import('./components/Menu/Menu'))
const LazyProducts= React.lazy(()=>import('./components/Products/Products'))
const LazyProductDetail= React.lazy(()=>import('./components/ProductDetails/ProductDetail'))
const LazyCart= React.lazy(()=>import('./components/Cart/Cart'))
const LazyProfile= React.lazy(()=>import('./components/Profile/Profile'))
const LazyCheckout= React.lazy(()=> import('./components/Checkout/Checkout'))
const LazyCheckoutSuccess= React.lazy(()=>import('./components/Checkout/CheckoutSuccess'))
const LazyOrders= React.lazy(()=>import('./components/Orders/Orders'))
const LazyCheckoutProfile= React.lazy(()=>import('./components/Checkout/CheckoutProfile'))
const LazyCheckoutInvoicePDF= React.lazy(()=>import('./components/InvoicePDF'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div><img src="./images/loading.gif"/></div>}>
      <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path='/' element={<LazyMenu/>}/>
          <Route path='/register' element={<LazyRegister/>}/>
          <Route path='/login' element={<LazyLogin/>}/>
          <Route path='/products' element={<LazyProducts/>}/>
          <Route path={`/product_detail/:id`} element={<LazyProductDetail/>}/>
          <Route path='/cart' element={<LazyCart/>}/>
          <Route path='/profile' element={<LazyProfile/>}/>
          <Route path='/checkout' element={<LazyCheckout/>}/>
          <Route path='/success' element={<LazyCheckoutSuccess/>}/>
          <Route path='/orders' element={<LazyOrders/>}/>
          <Route path='/checkprofile' element={<LazyCheckoutProfile/>}/>
          <Route path='/invoicepdf' element={<LazyCheckoutInvoicePDF/>}/>
      </Routes>
      <LazyFooter/>
      </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
