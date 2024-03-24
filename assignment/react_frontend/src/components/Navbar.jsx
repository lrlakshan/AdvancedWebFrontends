import React from 'react';
import { Link } from 'react-router-dom';
import { dataTestIds } from '../tests/constants/components';

const Navbar = ({ role, logout }) => {

  const { linkId } = dataTestIds;
  
  const renderLinks = () => {
    switch (role) {
      case 'Guest':
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
      case 'Customer':
        return (
          <>
            <Link to="/" data-testid="home-link">Home</Link>
            <Link to="/products" data-testid="products-link">Products</Link>
            <Link to="/orders" data-testid="orders-link">Orders</Link>
            <Link to="/cart" data-testid="cart-link">Cart</Link>
            <button onClick={logout} data-testid="logout">Logout</button>
          </>
        );
      case 'Admin':
        return (
          <>
            <Link to="/" data-testid="home-link">Home</Link>
            <Link to="/products" data-testid="products-link">Products</Link>
            <Link to="/orders" data-testid="orders-link">Orders</Link>
            <Link to="/users" data-testid="users-link">Users</Link>
            <button onClick={logout} data-testid="logout">Logout</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div data-testid="navbar-container">
      {renderLinks()}
      <div data-testid="profile-container">Role: {role}</div>
    </div>
  );
};

export default Navbar;
