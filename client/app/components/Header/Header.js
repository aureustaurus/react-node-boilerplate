import React from 'react';

import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => (
  <header>
    <nav className='top-menu'>
      <Link to="/">Home</Link>
      <Link to="/helloworld">Hello World</Link>
      <Link to="/shops">Shops</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
