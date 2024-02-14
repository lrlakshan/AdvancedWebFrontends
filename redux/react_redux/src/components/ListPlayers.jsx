/** @format */

/** @format
 * @description
 * Student instructions:
 *
 * Copy paste your code from the ListPlayers.jsx file here from the react player fetch exercise
 * BEWARE: Only the selectPlayer function is passed as a prop from now on. The players data is fetched from the redux store.
 *
 */

import React from "react";
import { useSelector } from "react-redux";
import { ListPlayer } from "./ListPlayer.jsx";

export const ListPlayers = ({ selectPlayer }) => {
  const players = useSelector(state => state.players);
  const handlePlayerClicked = (playerId) => {
    selectPlayer(playerId);
  };

  return (
    <div>
      <h2>List of players</h2>
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
