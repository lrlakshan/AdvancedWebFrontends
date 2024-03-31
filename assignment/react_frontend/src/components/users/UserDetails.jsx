import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { dataTestIds } from "../../tests/constants/components";
import NotFoundPage from "../NotFoundPage";
import { deleteUser, fetchUser } from "../../redux/actionCreators/thunks/users";

const UserDetailsPage = () => {
  const { containerId, textId, clickId } = dataTestIds;

  // Extract the userId from the URL parameters
  const { userId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { allUsers, selectedUser, currentUser } = useSelector(
    (state) => state.user
  );

  // Find the selected user from the store
  //const userFound = allUsers.find((user) => user.id === userId) || selectedUser;

  // Dispatch getUser action only when the user has not been fetched
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);
  console.log("userFound", Object.keys(selectedUser).length === 0);

  if ((Object.keys(selectedUser).length === 0)) {
    return <NotFoundPage />;
  }

  const handleDelete = () => {
    navigate("/users");
    dispatch(deleteUser(userId));
  };

  const handleModify = () => {
    navigate(`/users/${userId}/modify`);
  };

  return (
    <div data-testid={containerId.inspect}>
      <h2>User Detail</h2>
      <p data-testid={textId.email}>Email: {selectedUser.email}</p>
      <p data-testid={textId.role}>Role: {selectedUser.role}</p>
      {selectedUser.id !== currentUser.id && (
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
