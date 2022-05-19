/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

import { USER_SERVER } from '../../../Config';

function MyMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Login</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Register</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>

        <Menu.Item key="mail">
          <a href="/">Home</a>
        </Menu.Item>

        <Menu.Item key="history">
          <a href="/history">History</a>
        </Menu.Item>

        <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>

        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart">
              <ShoppingCartOutlined style={{ fontSize: '140%'}}/>
            </a>
          </Badge>
        </Menu.Item>


        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(MyMenu);

