import React from 'react';
import { IndexLink } from 'react-router';
import { Button } from 'react-bootstrap';
import './HomePage.css';

const HomePage = (p) => (
  <div>
    <p className='Home'>
      Home Page
    </p>
    <p>
      Napster Login Succeeded!
    </p>
    <p>
      <Button onClick={p._f.fetchWithCookie}>
        Test Cookies
      </Button>
    </p>
    <p>
      <Button onClick={p._f.fetchData}>
        Get Data
      </Button>
    </p>
    <p>
      <Button>
        <IndexLink to="/">
          to login page
        </IndexLink>
      </Button>
    </p>
    <p>
      { p.testData }
    </p>
  </div>
);

export { HomePage };
