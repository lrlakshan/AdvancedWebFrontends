/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */

import React, { useState } from "react";

export const AddPlayer = ({ handleSubmit }) => {
  const [newPlayerName, setNewPlayerName] = useState("");

  const submitPlayer = (e) => {
    e.preventDefault();
    if (newPlayerName.trim() !== "") {
      handleSubmit(newPlayerName.trim());
      setNewPlayerName("");
    }
  };

  return (
    <div>
      <h3>Add Player</h3>
      <form id="submit-player" onSubmit={submitPlayer}>
        <input
          type="text"
          id="input-player"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Enter player name"
          required
        />
        <button type="submit" className="btn-add">
          Add Player
        </button>
      </form>
    </div>
  );
};
