/** @format
 * Copy paste your code from the ListPlayer.jsx file here from the previous exercise
 * BEWARE: Only the player passed to this component as prop. All the other data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getSelectedPlayer, found in src\redux\actionCreators\thunks\ListPlayer.jsx
 */

import { useDispatch } from "react-redux";
import { getSelectedPlayer } from "../redux/actionCreators/thunks/ListPlayer";

export const ListPlayer = ({ player }) => {

  const disapatch = useDispatch();

  const handlePlayerClick = () => {
    disapatch(getSelectedPlayer(player.id));
  };

  return (
    <li id={`player-${player.id}`} onClick={handlePlayerClick}>
      <a href="#" onClick={(e) => e.preventDefault()}>
        {player.name}
      </a>
    </li>
  );
};
