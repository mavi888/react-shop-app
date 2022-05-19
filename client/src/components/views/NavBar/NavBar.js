import React from 'react';
import MyMenu from './Sections/MyMenu';

import './Sections/Navbar.css';

function NavBar() {

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">FooBar Store</a>
      </div>
      <div className="menu__container">
          <MyMenu mode="horizontal" />
      </div>
    </nav>
  )
}

export default NavBar