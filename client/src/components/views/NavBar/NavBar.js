import React, { useState } from 'react';
import MyMenu from './Sections/MyMenu';
import { Drawer, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">FooBar</a>
      </div>
      <div className="menu__container">
        <div className="menu">
          <MyMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <SmileOutlined />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <MyMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar