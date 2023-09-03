import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "state"
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from 'state/api';
import { ThemeProvider } from '@mui/material';
import { themeSettings } from 'theme';

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer, 
  },
  middleware: (getDefault)=> getDefault().concat(api.middleware)
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={themeSettings}>

      <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

