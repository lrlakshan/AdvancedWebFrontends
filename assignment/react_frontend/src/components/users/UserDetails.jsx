import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { dataTestIds } from "../../tests/constants/components";
import NotFoundPage from "../NotFoundPage";
import { fetchUser } from "../../redux/actionCreators/thunks/users";

const UserDetailsPage = () => {
  const { containerId, textId, clickId } = dataTestIds;

  // Extract the userId from the URL parameters
  const { userId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { allUsers, selectedUser, currentUser } = useSelector(
    (state) => state.user
  );

  // State variable to track if the user has been fetched
  const [userFetched, setUserFetched] = useState(false);

  // Find the selected user from the store
  const userFound = allUsers.find((user) => user.id === userId) || selectedUser;

  // Dispatch getUser action only when the user has not been fetched
  useEffect(() => {
    if (!userFetched) {
      dispatch(fetchUser(userId));
      setUserFetched(true);
    }
  }, [dispatch, userId, userFetched]);

  if (!userFound && !userFetched) {
    return <NotFoundPage />;
  }

  const handleDelete = () => {
    // navigate("/products");
    // dispatch(deleteProduct(productId));
  };

  const handleModify = () => {
    navigate(`/users/${userId}/modify`);
  };

  return (
    <div data-testid={containerId.inspect}>
      <h2>User Detail</h2>
      <p data-testid={textId.email}>Email: {userFound.email}</p>
      <p data-testid={textId.role}>Role: {userFound.role}</p>
      {userFound.id !== currentUser.id && (
        <div>
          <button data-testid={clickId.delete} onClick={handleDelete}>
            Delete
          </button>
          <button data-testid={clickId.modify} onClick={handleModify}>
            Modify
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
