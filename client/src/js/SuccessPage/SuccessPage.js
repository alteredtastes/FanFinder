import React from 'react';
import { IndexLink } from 'react-router';
import { Button } from 'react-bootstrap';
import './SuccessPage.css';

const SuccessPage = (p) => (
  <div>
    <p className='Success'>
      Success Page
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
          to home page
        </IndexLink>
      </Button>
    </p>
    <p>
      { p.testData }
    </p>
  </div>
);

export { SuccessPage };
