import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CreatorLink } from './components/CreatorLink';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CreatorLink />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
