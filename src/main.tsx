import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SearchBarProvider from './contex/SearchBarProvider';
import FilterBarProvider from './contex/FilterBarProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(

    <BrowserRouter>
      <SearchBarProvider>
        <FilterBarProvider>
          <App />
        </FilterBarProvider>
      </SearchBarProvider>
    </BrowserRouter>,

  );
