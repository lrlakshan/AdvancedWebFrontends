/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */

import React from "react";
import { ListPlayer } from "./ListPlayer.jsx";

export const ListPlayers = ({ players, getPlayer }) => {
  const handlePlayerClicked = (playerId) => {
    getPlayer(playerId);
  };

  return (
    <div>
      <h2>List of Players</h2>
      <ul id="players-list">
        {players.map((player) => (
          <ListPlayer
            key={player.id}
            player={player}
            onClick={handlePlayerClicked}
          />
        ))}
      </ul>
    </div>
  );
};
