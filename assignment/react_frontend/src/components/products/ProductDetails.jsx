import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { USERS } from "../../constants/constants";
import { dataTestIds, stateTypes } from "../../tests/constants/components";
import NotFoundPage from "../NotFoundPage";
import { deleteProduct, getProduct } from "../../redux/actionCreators/thunks/products";
import { addToCart } from "../../redux/actionCreators/cartActions";
import { setNotifications } from "../../redux/actionCreators/notificationActions";

const ProductDetailPage = () => {
  const { containerId, textId, clickId, notificationId } = dataTestIds;

  // Extract the productId from the URL parameters
  const { productId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);
  const { products, product } = useSelector((state) => state.products);

  // State variable to track if the product has been fetched
  const [productFetched, setProductFetched] = useState(false);

  // Find the selected product from the store
  const selectedProduct =
    products.find((product) => product.id === productId) || product;

  // Dispatch getProduct action only when the product has not been fetched
  useEffect(() => {
    if (!productFetched) {
      dispatch(getProduct(productId));
      setProductFetched(true);
    }
  }, [dispatch, productId, productFetched]);

  const handleDelete = useCallback(() => {
    dispatch(deleteProduct(productId));
    // Wait for a short delay before navigating away
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  }, [navigate, dispatch]);

  const handleModify = useCallback(() => {
    navigate(`/products/${productId}/modify`);
  }, [navigate]);

  const handleAddToCart = useCallback((product, quantity) => {
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
    }
  }, [dispatch]);

  if (!selectedProduct && !productFetched) {
    return <NotFoundPage />;
  }

  return (
    <div data-testid={containerId.inspect}>
      <h2>Product Detail</h2>
      <p data-testid={textId.name}>{selectedProduct.name}</p>
      <p data-testid={textId.description}>{selectedProduct.description}</p>
      <p data-testid={textId.price}>Price: {selectedProduct.price}</p>
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
        <button
          onClick={handleAddToCart(product, 1)}
          data-testid={clickId.add}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductDetailPage;
