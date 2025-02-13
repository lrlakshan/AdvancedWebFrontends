import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, fetchUser, fetchUsers } from "../../redux/actionCreators/thunks/users";
import { dataTestIds, stateTypes } from "../../tests/constants/components";

const Users = () => {
  const { containerId, textId, linkId, clickId, notificationId } = dataTestIds;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUsers, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = useCallback((userId) => {
    return () => {
      dispatch(deleteUser(userId));
    };
  }, [dispatch]);
  
  const handleModify = useCallback((userId) => {
    return () => {
      dispatch(fetchUser(userId));
      navigate(`/users/${userId}/modify`);
    };
  }, [dispatch, navigate]);

  return (
    <div data-testid={containerId.main}>
      {allUsers.length === 0 ? (
        <div data-testid={containerId.empty}>No users exist</div>
      ) : (
        allUsers.map((user) => (
          <div key={user.id} data-testid={containerId.listItem(user.id)}>
            <p data-testid={textId.name}>Name: {user.name}</p>
            <p data-testid={textId.role}>Role: {user.role}</p>
            <p>
              <Link to={`/users/${user.id}`} data-testid={linkId.inspect(user.id)}>View User</Link>
            </p>
            {user.id !== currentUser.id && (
              <div>
                <button data-testid={clickId.modify} onClick={handleModify(user.id)}>
                  Modify
                </button>
                <button data-testid={clickId.delete} onClick={handleDelete(user.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Users;
