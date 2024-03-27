import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dataTestIds } from "../../tests/constants/components";

const ModifyProduct = () => {
  const { containerId, clickId, inputId } = dataTestIds;

  const { product } = useSelector((state) => state.products);

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO
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
            value={product.id}
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
