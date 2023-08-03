import logo from './logo.svg';
import './App.css';
import Layout from './scenes/layout';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lightTheme } from './theme';
import Products from './scenes/products';

  function App() {
    return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element = {<Navigate to="/home" replace />} />
              <Route path='/products' element = {Products} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

    </div>
    );
  }

export default App;
