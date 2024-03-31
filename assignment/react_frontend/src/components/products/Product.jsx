import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { dataTestIds, stateTypes } from "../../tests/constants/components";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from "../../redux/actionCreators/thunks/products";
import { addToCart } from "../../redux/actionCreators/cartActions";
import { setNotifications } from "../../redux/actionCreators/notificationActions";
import { USERS } from "../../constants/constants";

const Product = ({ products }) => {
  const { notificationId, clickId, containerId, textId, linkId, inputId } =
    dataTestIds;
  const { role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = useCallback(
    (product, quantity) => {
      return () => {
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
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (productId) => {
      return () => {
        dispatch(deleteProduct(productId));
      };
    },
    [dispatch]
  );

  const handleModify = useCallback(
    (productId) => {
      return () => {
        dispatch(getProduct(productId));
        navigate(`/products/${productId}/modify`);
      };
    },
    [dispatch, navigate]
  );
  return (
    <div>
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
                <button
                  data-testid={clickId.delete}
                  onClick={handleDelete(product.id)}
                >
                  Delete
                </button>
                <button
                  data-testid={clickId.modify}
                  onClick={handleModify(product.id)}
                >
                  Modify
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart(product, 1)}
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

export default Product;
