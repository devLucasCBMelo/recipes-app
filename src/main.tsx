import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SearchBarProvider from './contex/SearchBarProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(

    <BrowserRouter>
      <SearchBarProvider>
        <App />
      </SearchBarProvider>
    </BrowserRouter>,

  );
