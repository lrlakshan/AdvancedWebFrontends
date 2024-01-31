/** @format
 *
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to create a new player in the backend when the user submits the form in the AddPlayer component.
 *
 * Likewise, add logic to update the player in the backend when the user clicks the update button in the SelectedPlayer component.
 *
 * Finally, add logic to delete the player in the backend when the user clicks the delete button in the SelectedPlayer component.
 * 
 * HINT: Before the above logic, it may be better to start by updating the SelectedPlayer component to use the new props.
 * 
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests. Remember to pass in the appropriate props to the child components.

 * BEWARE: The component props may be different from the Vue exercise and the tests will not pass if you use the wrong props. Look at invididual component file descriptions and tests to see what props are expected.
 *
 */
const url = "http://localhost:3001/api/players";
import React, { useState, useEffect } from "react";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { AddPlayer } from "./components/AddPlayer.jsx";

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        setRequestStatus(REQ_STATUS.loading);
        const response = await fetch(url);
        const data = await response.json();
        setPlayers(data);
        setRequestStatus(REQ_STATUS.success);
      } catch (error) {
        console.error(error);
        setRequestStatus(REQ_STATUS.error);
      }
    };

    fetchAllPlayers();
  }, []);

  const fetchOnePlayer = async (playerId) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(url + "/" + playerId);
      const data = await response.json();
      setSelectedPlayer(data);
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error(error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const handleAddPlayer = async (newPlayerName) => {
    if (newPlayerName.trim() !== "") {
      try {
        setRequestStatus(REQ_STATUS.loading);
        const newPlayer = {
          name: newPlayerName,
          isActive: false,
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlayer),
        });

        const createdPlayer = await response.json();
        setPlayers([...players, createdPlayer]);
        setRequestStatus(REQ_STATUS.success);
      } catch (error) {
        console.error(error);
        setRequestStatus(REQ_STATUS.error);
      }
    }
  };

  const changePlayerStatus = async (isActive) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(url + "/" + selectedPlayer.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive }),
      });
      const data = await response.json();
      setSelectedPlayer(data);
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error(error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const deletePlayer = async (playerId) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      await fetch(url + "/" + playerId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSelectedPlayer(null);
      setPlayers(players.filter((player) => player.id !== playerId));
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error(error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  return (
    <div>
      <RequestStatus>{requestStatus}</RequestStatus>
      <AddPlayer handleSubmit={handleAddPlayer} />
      <ListPlayers players={players} getPlayer={fetchOnePlayer} />
      <SelectedPlayer
        player={selectedPlayer}
        handleUpdate={changePlayerStatus}
        handleDelete={deletePlayer}
      />
    </div>
  );
}

export default App;
