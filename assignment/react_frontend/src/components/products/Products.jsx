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
import Product from "./Product";

const Products = () => {
  const { notificationId, clickId, containerId, textId, linkId, inputId } = dataTestIds;
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { role } = useSelector((state) => state.user);

  // State for managing product creator form visibility
  const [isProductCreatorOpen, setProductCreatorOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleNewProductChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }, []);

  const handleProductSubmit = useCallback(() => {
    dispatch(addProduct(newProduct));
    setProductCreatorOpen(false);
    setNewProduct({
      name: "",
      price: "",
      description: "",
    });
  }, [dispatch]);

  const handleProductCancel = useCallback(() => {
    setProductCreatorOpen(false);
    setNewProduct({
      name: "",
      price: "",
      description: "",
    });
  }, []);

  const openAddProductInfo = useCallback(() => {
    setProductCreatorOpen(true);
  }, []);

  return (
    <div data-testid={containerId.main}>
      <div>
        {USERS.admin === role && (
          <button
            onClick={openAddProductInfo}
            data-testid={clickId.add}
          >
            Add New Product
          </button>
        )}
      </div>
      {isProductCreatorOpen && (
        <div data-testid={containerId.form}>
          <div>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleNewProductChange}
              placeholder="Name"
              data-testid={inputId.name}
            />
          </div>
          <div>
            <input
              type="text"
              name="price"
              value={newProduct.price}
              onChange={handleNewProductChange}
              placeholder="Price"
              data-testid={inputId.price}
            />
          </div>
          <div>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleNewProductChange}
              placeholder="Description"
              data-testid={inputId.description}
            />
          </div>
          <div>
            <button onClick={handleProductSubmit} data-testid={clickId.submit}>
              Submit
            </button>
            <button onClick={handleProductCancel} data-testid={clickId.cancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <h2>Products</h2>
      <Product products={products}/>
    </div>
  );
};

export default Products;
