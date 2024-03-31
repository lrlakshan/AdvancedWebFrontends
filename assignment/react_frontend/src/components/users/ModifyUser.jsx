import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USERS } from "../../constants/constants";
import { dataTestIds } from "../../tests/constants/components";
import { modifyUser } from "../../redux/actionCreators/thunks/users";

const ModifyUser = () => {
  const { containerId, clickId, inputId, selectId } = dataTestIds;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedUser } = useSelector((state) => state.user);

  const [role, setRole] = useState(USERS.customer);

  useEffect(() => {
    setRole(selectedUser.role || USERS.customer);
  }, [selectedUser]);

  const handleSubmit = ((event) => {
    event.preventDefault();
    const userToBeUpdated = {
        role: role
    };
    dispatch(modifyUser(selectedUser.id, userToBeUpdated));
    navigate(-1);
  }, [dispatch, selectedUser, navigate]);

  const handleCancel = useCallback((event) => {
    event.preventDefault();
    navigate(`/users/${selectedUser.id}`);
  }, [navigate, selectedUser]);

  const handleRoleChange = useCallback((event) => {
    setRole(event.target.value);
  }, []);

  return (
    <div data-testid={containerId.form}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={inputId.name}>Name:</label>
          <input
            data-testid={inputId.name}
            value={selectedUser.name || ""}
            readOnly
          />
        </div>
        <div>
          <label htmlFor={inputId.role}>Role:</label>
          <select
            data-testid={selectId.role}
            value={role}
            onChange={handleRoleChange}
          >
            <option value={USERS.customer}>customer</option>
            <option value={USERS.admin}>admin</option>
          </select>
        </div>
        <div>
          <button type={clickId.submit} data-testid={clickId.submit}>
            Update
          </button>
          <button onClick={handleCancel} data-testid={clickId.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifyUser;
