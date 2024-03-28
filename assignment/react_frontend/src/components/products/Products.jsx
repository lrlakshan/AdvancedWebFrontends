import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { dataTestIds, stateTypes } from '../../tests/constants/components';
import { getProducts } from '../../redux/actionCreators/thunks/products';
import { addToCart } from '../../redux/actionCreators/cartActions';
import { setNotifications } from '../../redux/actionCreators/notificationActions';
import { USERS } from '../../constants/constants';

const Products = () => {
  const { notificationId, clickId, containerId, textId, linkId } = dataTestIds;
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { role } = useSelector(state => state.role);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart(product, quantity));
    dispatch(setNotifications(stateTypes.cart, notificationId.success(stateTypes.cart), "Added to cart", Date.now()));
  };

  const handleDelete = () => {
    // TODO
  };

  const handleModify = () => {
    // TODO
  };

  return (
    <div data-testid={containerId.main}>
      <h2>Products</h2>
      {products.length === 0 ? (
        <div data-testid={containerId.empty}>
          No products exist
        </div>
      ) : (
        products.map(product => (
          <div key={product.id} data-testid={containerId.listItem(product.id)}>
            <p data-testid={textId.name}>{product.name}</p>
            <p data-testid={textId.value}>Price: {product.price}</p>
            <Link to={`/products/${product.id}`} data-testid={linkId.inspect(product.id)}>Inspect</Link>
            {USERS.admin === role ? (
              <div>
                <button data-testid={clickId.delete} onClick={handleDelete}>
                  Delete
                </button>
                <button data-testid={clickId.modify} onClick={handleModify}>
                  Modify
                </button>
              </div>
            ) : (
              <button onClick={() => handleAddToCart(product, 1)} data-testid={clickId.add}>
                Add to Cart
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Products
