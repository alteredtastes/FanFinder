import React from 'react';
import { Link } from 'react-router';
import { Button, Image } from 'react-bootstrap';
import './LoginPage.css';

const LoginPage = ({ oauth }) => (
  <div className='Login'>
    <Button href={oauth}>
      <Image src="/images/napster_logo.png" className="logo"/>
      Login With Napster
    </Button>
  </div>
);

export { LoginPage };
