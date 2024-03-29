import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { dataTestIds, stateTypes } from "../../tests/constants/components";
import { deleteProduct, getProduct, getProducts } from "../../redux/actionCreators/thunks/products";
import { addToCart } from "../../redux/actionCreators/cartActions";
import { setNotifications } from "../../redux/actionCreators/notificationActions";
import { USERS } from "../../constants/constants";

const Products = () => {
  const { notificationId, clickId, containerId, textId, linkId } = dataTestIds;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { role } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart(product, quantity));
    dispatch(
      setNotifications(
        stateTypes.cart,
        notificationId.success(stateTypes.cart),
        "Added to cart",
        Date.now()
      )
    );
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleModify = (productId) => {
    dispatch(getProduct(productId));
    navigate(`/products/${productId}/modify`);
  };

  return (
    <div data-testid={containerId.main}>
      <h2>Products</h2>
      {products.length === 0 ? (
        <div data-testid={containerId.empty}>No products exist</div>
      ) : (
        products.map((product) => (
          <div key={product.id} data-testid={containerId.listItem(product.id)}>
            <p data-testid={textId.name}>{product.name}</p>
            <p data-testid={textId.value}>Price: {product.price}</p>
            <Link
              to={`/products/${product.id}`}
              data-testid={linkId.inspect(product.id)}
            >
              Inspect
            </Link>
            {USERS.admin === role ? (
              <div>
                <button data-testid={clickId.delete} onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
                <button
                  data-testid={clickId.modify}
                  onClick={() => handleModify(product.id)}
                >
                  Modify
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(product, 1)}
                data-testid={clickId.add}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Products;
