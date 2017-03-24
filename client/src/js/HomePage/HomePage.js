import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import './HomePage.css';

const HomePage = ({ oauth, _f }) => (
  <div className='Home'>
    <p>
      Login Page
    </p>
    <Button href={oauth}>
      Login With Napster
    </Button>
    <Button name='loggerButton' onClick={_f.logger}>
      Logger
    </Button>
    <Button>
      <Link to="success">
        to success page
      </Link>
    </Button>
  </div>
);

export { HomePage };
