import React from 'react';
import { Link } from 'react-router-dom';
import { dataTestIds } from '../tests/constants/components';
import { USERS } from '../constants/constants';

const Navbar = ({ role, logout }) => {

  const { linkId, clickId, containerId } = dataTestIds;

  const renderLinks = () => {
    switch (role) {
      case USERS.guest:
        return (
          <nav>
            <ul>
              <li><Link to="/" data-testid={linkId.home}>Home</Link></li>
              <li><Link to="/products" data-testid={linkId.products}>Products</Link></li>
              <li><Link to="/cart" data-testid={linkId.cart}>Cart</Link></li>
              <li><Link to="/login" data-testid={linkId.login}>Login</Link></li>
              <li><Link to="/register" data-testid={linkId.register}>Register</Link></li>
            </ul>
          </nav>
        );
      case USERS.customer:
        return (
          <>
            <Link to="/" data-testid={linkId.home}>Home</Link>
            <Link to="/products" data-testid={linkId.products}>Products</Link>
            <Link to="/orders" data-testid={linkId.orders}>Orders</Link>
            <Link to="/cart" data-testid={linkId.cart}>Cart</Link>
            <button onClick={logout} data-testid={clickId.logout}>Logout</button>
          </>
        );
      case USERS.admin:
        return (
          <>
            <Link to="/" data-testid={linkId.home}>Home</Link>
            <Link to="/products" data-testid={linkId.products}>Products</Link>
            <Link to="/orders" data-testid={linkId.orders}>Orders</Link>
            <Link to="/users" data-testid={linkId.users}>Users</Link>
            <button onClick={logout} data-testid={clickId.logout}>Logout</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div data-testid={containerId.navbar}>
      {renderLinks()}
    </div>
  );
};

export default Navbar;
