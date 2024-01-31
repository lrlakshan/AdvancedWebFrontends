/**
 * Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to call the "handleUpdate"
 * prop function when the update button is clickable and the user clicks it.
 * In the App.jsx, this should trigger the updating of the player in the backend.
 *
 * Likewise, add logic to call the "handleDelete" prop function when the user
 * clicks the delete button. In the App.jsx, this should trigger the deletion of the player in the backend.
 *
 */

import React, { useState, useEffect } from "react";

export const SelectedPlayer = ({ player, handleUpdate, handleDelete }) => {
  const [playerCurrentStatus, setPlayerCurrentStatus] = useState(
    player?.isActive ?? false
  );

  const handleCheckboxChange = () => {
    setPlayerCurrentStatus((prevStatus) => !prevStatus);
  };

  const updatePlayer = () => {
    if (playerCurrentStatus !== player.isActive) {
        handleUpdate(playerCurrentStatus);
    }
  };

  const handleDeletePlayer = () => {
    handleDelete(player.id);
  };

  useEffect(() => {
    setPlayerCurrentStatus(player?.isActive ?? false);
  }, [player]);

  return (
    <div>
      <h3>{player ? "Selected Player" : "No Player Selected"}</h3>
      {player && (
        <div id="selected-player">
          <div className="player-id">{player.id}</div>
          <div id="player-name">{player.name}</div>
          <div id="player-status">
            <label htmlFor="checkbox" id="checkbox-label">
              <input
                type="checkbox"
                id="checkbox"
                checked={playerCurrentStatus}
                onChange={handleCheckboxChange}
              />
              <span className="checkmark"></span>
              {playerCurrentStatus ? "active" : "inactive"}
            </label>
          </div>
          <div>
            <button
              className="btn-update"
              disabled={playerCurrentStatus === player.isActive}
              onClick={updatePlayer}
            >
              Update
            </button>
            <button className="btn-delete" onClick={handleDeletePlayer}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
