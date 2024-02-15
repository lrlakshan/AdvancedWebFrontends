/** @format 
 * 
 *
  Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.

	BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.

	Here are the thunks that you can use to update the redux store:
	- deleteSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx
	- updateSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx

*/

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { updateSelectedPlayer, deleteSelectedPlayer } from "../redux/actionCreators/thunks/SelectedPlayer";

export const SelectedPlayer = () => {
  const dispatch = useDispatch(); 
  const selectedPlayer = useSelector((state) => state.selectedPlayer);

  const [playerCurrentStatus, setPlayerCurrentStatus] = useState(
    selectedPlayer?.isActive ?? false
  );
  const isSelectedPayerVisible =
    selectedPlayer !== null && Object.keys(selectedPlayer).length !== 0;

  const handleCheckboxChange = () => {
    setPlayerCurrentStatus((prevStatus) => !prevStatus);
  };

  const updatePlayer = () => {
    if (playerCurrentStatus !== selectedPlayer.isActive) {
	  dispatch(updateSelectedPlayer(playerCurrentStatus));
    }
  };

  const handleDeletePlayer = () => {
	dispatch(deleteSelectedPlayer());
  };

  useEffect(() => {
    setPlayerCurrentStatus(selectedPlayer?.isActive ?? false);
  }, [selectedPlayer]);

  return (
    <div>
      <div>
        {isSelectedPayerVisible && (
          <div id="selected-player">
            <div className="player-id">{selectedPlayer.id}</div>
            <div id="player-name">{selectedPlayer.name}</div>
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
                disabled={playerCurrentStatus === selectedPlayer.isActive}
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
    </div>
  );
};
