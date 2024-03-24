import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { USERS } from '../../constants/constants';
import NotFoundPage from '../NotFoundPage';
import { getProduct } from '../../redux/actionCreators/thunks/products';

const ProductDetailPage = () => {
  // Extract the productId from the URL parameters
  const { productId } = useParams();

  const dispatch = useDispatch();
  const { role } = useSelector(state => state.role);
  const { products, product } = useSelector(state => state.products);

  // State variable to track if the product has been fetched
  const [productFetched, setProductFetched] = useState(false);

  // Find the selected product from the store
  const selectedProduct = products.find(product => product.id === productId) || product;

  // Dispatch getProduct action only when the product has not been fetched
  useEffect(() => {
    if (!productFetched) {
      dispatch(getProduct(productId));
      setProductFetched(true);
    }
  }, [dispatch, productId, productFetched]);

  if (!selectedProduct && !productFetched) {
    return <NotFoundPage />;
  }

  const handleDelete = () => {
    // Implement delete product functionality here
    console.log('Delete product with ID:', productId);
  };

  const handleModify = () => {
    // Implement modify product functionality here
    console.log('Modify product with ID:', productId);
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality here
    console.log('Add product with ID:', productId, 'to cart');
  };

  return (
    <div data-testid="inspect-container">
      <h2>Product Detail</h2>
      <p data-testid="name-value">Name: {selectedProduct.name}</p>
      <p data-testid="description-element">Description: {selectedProduct.description}</p>
      <p data-testid="price-element">Price: {selectedProduct.price}</p>
      {(USERS.admin === role) ? (
        <div>
          <button data-testid="delete" onClick={handleDelete}>
            Delete
          </button>
          <button data-testid="modify" onClick={handleModify}>
            Modify
          </button>
        </div>
      ) : (
        <button data-testid="add" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductDetailPage;
