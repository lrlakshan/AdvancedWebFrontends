/** @format
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getPlayers, found in src\redux\actionCreators\thunks\ListPlayers.jsx
 */
import { useSelector } from "react-redux";
import { ListPlayer } from "./ListPlayer";

export const ListPlayers = () => {
  const players = useSelector((state) => state.players);

  return (
    <div>
      <h2>List of players</h2>
      <ul id="players-list">
        {players.map((player) => (
          <ListPlayer
            key={player.id}
            player={player}
          />
        ))}
      </ul>
    </div>
  );
};
