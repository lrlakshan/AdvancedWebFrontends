import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../../redux/actionCreators/thunks/products';
import { addToCart } from '../../redux/actionCreators/cartActions';
import { setNotifications } from '../../redux/actionCreators/notificationActions';

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = (productId, quantity, products) => {
    dispatch(addToCart(productId, quantity, products));
    dispatch(setNotifications("cart", "success", 'Added to Cart', Date.now()));
  };

  return (
    <div data-testid="main-container">
      <h2>Products</h2>
      {products.length === 0 ? (
        <div data-testid="empty-container">
          No products exist
        </div>
      ) : (
        products.map(product => (
          <div key={product.id} data-testid={`list-item-${product.id}-container`}>
            <p data-testid="name-value">{product.name}</p>
            <p data-testid="price-value">Price: {product.price}</p>
            {/* TODO:: Change linke name */}
            <Link to={`/products/${product.id}`} data-testid={`inspect-${product.id}-link`}>Inspect</Link>
            <button onClick={() => handleAddToCart(product.id, 1)} data-testid="add">
              Add
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Products
