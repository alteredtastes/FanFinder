import React from 'react';
// import { Button } from 'react-bootstrap';
import './HomePage.css';

const HomePage = ({ submitSearch }) => (
  <div>
    <p className='Home'>
      Home Page
    </p>
    <p>
      <input onChange={submitSearch} type="text"/>
    </p>
  </div>
);

export { HomePage };
