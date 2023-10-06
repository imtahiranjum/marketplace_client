import logo from './logo.svg';
import './index.css';
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lightTheme, themeSettings } from './theme';
import AllOnSaleCattle from './scenes/products';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import ProductDetails from 'scenes/productDetails';
import Layout from 'scenes/layout';
import SignIn from 'scenes/signin';
import SignUp from 'scenes/signup';
import ForgotPassword from 'scenes/forgotPassword';

  function App() {
    return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={themeSettings}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element = {<Navigate to="/products" replace />} />
              <Route path='/products' element = {<AllOnSaleCattle/>} />
              <Route path='/productdetails' element = {<ProductDetails/>} />
            </Route>
            <Route path='/signin' element = {<SignIn/>} />
            <Route path='/signup' element = {<SignUp/>} />
            <Route path='/forgotpassword' element = {<ForgotPassword/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

    </div>
    );
  }

export default App;
