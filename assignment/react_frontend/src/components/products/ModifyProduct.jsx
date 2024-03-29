import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataTestIds } from "../../tests/constants/components";
import { updateProduct } from "../../redux/actionCreators/thunks/products";

const ModifyProduct = () => {
  const { containerId, clickId, inputId } = dataTestIds;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.products);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    setName(product.name || "");
    setDescription(product.description || "");
    setPrice(product.price || "");
  }, [product]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const productToBeUpdated = {
        price: price,
        name: name,
        description: description
    }
    dispatch(updateProduct(product.id, productToBeUpdated));
    navigate(`/products/${product.id}`)
  };

  const handleCancel = () => {
    // TODO
  };

  return (
    <div data-testid={containerId.form}>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor={inputId.id}>ID:</label>
          <input
            data-testid={inputId.id}
            value={product.id || ""}
            readOnly
          />
        </div>
        <div>
          <label htmlFor={inputId.name}>Name:</label>
          <input
            type="text"
            id={inputId.name}
            data-testid={inputId.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor={inputId.description}>Description:</label>
          <textarea
            id={inputId.description}
            data-testid={inputId.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor={inputId.price}>Price:</label>
          <input
            type="number"
            id={inputId.price}
            data-testid={inputId.price}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <button type={clickId.submit} data-testid={clickId.submit}>
            Update
          </button>
          <button
            onClick={handleCancel}
            data-testid={clickId.cancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifyProduct;
