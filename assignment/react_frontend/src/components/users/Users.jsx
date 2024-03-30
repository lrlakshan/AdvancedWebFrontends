import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser, fetchUsers } from "../../redux/actionCreators/thunks/users";
import { dataTestIds, stateTypes } from "../../tests/constants/components";
import { setNotifications } from "../../redux/actionCreators/notificationActions";

const Users = () => {
  const { containerId, textId, linkId, clickId, notificationId } = dataTestIds;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUsers, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      setNotifications(
        stateTypes.auth,
        notificationId.loading(stateTypes.auth),
        "loading",
        Date.now()
      )
    );
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    //TODO
    //dispatch(deleteUser(userId));
  };

  const handleModify = (userId) => {
    dispatch(fetchUser(userId));
    navigate(`/users/${userId}/modify`);
  };

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
                <button data-testid={clickId.modify} onClick={() => handleModify(user.id)}>
                  Modify
                </button>
                <button data-testid={clickId.delete} onClick={() => handleDelete(user.id)}>
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
