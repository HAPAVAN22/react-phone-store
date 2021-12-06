import React from 'react'
import {Routes,Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import Modal from './components/Modal'

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ProductList/>}></Route>
        <Route exact path="/details" element={<Details/>}></Route>
        <Route exact path="/store" element={<Cart/>}></Route>
        <Route path="*" element={<Default/>}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
