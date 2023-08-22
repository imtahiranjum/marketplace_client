import logo from './logo.svg';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lightTheme, themeSettings } from './theme';
import Products from './scenes/products';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import ProductDetails from 'scenes/productDetails';
import Layout from 'scenes/layout';
import SignIn from 'scenes/signin';
import SignUp from 'scenes/signup';

  function App() {
    const mode = useSelector((state) => state.global.mode)
    return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={themeSettings}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element = {<Navigate to="/products" replace />} />
              <Route path='/products' element = {<Products/>} />
              <Route path='/signin' element = {<SignIn/>} />
              <Route path='/signup' element = {<SignUp/>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

    </div>
    );
  }

export default App;
