/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */

import React from "react";

export const ListPlayer = ({ player, onClick }) => {
  const handlePlayerClick = () => {
    onClick(player.id);
  };

  return (
    <li id={`player-${player.id}`} onClick={handlePlayerClick}>
      <a href="#" onClick={(e) => e.preventDefault()}>
        {player.name}
      </a>
    </li>
  );
};
