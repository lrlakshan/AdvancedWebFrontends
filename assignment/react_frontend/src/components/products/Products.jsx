import React, { useEffect, useState } from "react";
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

const Products = () => {
  const { notificationId, clickId, containerId, textId, linkId, inputId } =
    dataTestIds;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { role } = useSelector((state) => state.role);

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

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleProductSubmit = () => {
    dispatch(addProduct(newProduct));
    setProductCreatorOpen(false);
    setNewProduct({
      name: "",
      price: "",
      description: "",
    });
  };

  const handleProductCancel = () => {
    setProductCreatorOpen(false);
    setNewProduct({
      name: "",
      price: "",
      description: "",
    });
  };

  return (
    <div data-testid={containerId.main}>
      {/* Add Product Button (only for admin) */}
      <div>
        {USERS.admin === role && (
          <button
            onClick={() => setProductCreatorOpen(true)}
            data-testid={clickId.add}
          >
            Add New Product
          </button>
        )}
      </div>
      {/* Product Creator Form */}
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
                  onClick={() => handleDelete(product.id)}
                >
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
