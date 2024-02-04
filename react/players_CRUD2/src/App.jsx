/** @format
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD2 exercise and add authentication to the app.
 * 
 * Backend is still using Basic Auth, so you must use the same logic as in the Vue exercise. 
 * 
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests. Remember to pass in the appropriate props to the child components. 

 * BEWARE: The component props may be different from the Vue exercise and the tests will not pass if you use the wrong props.
 */

import React, { useState } from "react";
import { AuthUser } from "./components/AuthUser.jsx";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { AddPlayer } from "./components/AddPlayer.jsx";

const url = "http://localhost:3001";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const loginUser = async (username, password) => {
    setUsernameState(username);
    setPasswordState(password);
    await fetchAllPlayers(username, password);
  };

  const registerUser = async (username, password) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(url + "/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      setUsernameState(username);
      setPasswordState(password);
      setRequestStatus(REQ_STATUS.success);
      await fetchAllPlayers(username, password);
    } catch (error) {
      console.error(error);
      setRequestStatus(REQ_STATUS.error);
      setIsLoggedIn(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setIsLoggedIn(false);
    setPlayers([]);
    setSelectedPlayer(null);
    setRequestStatus(null);
  };

  const fetchAllPlayers = async (username, password) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(url + "/api/players", {
        headers: {
          Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
        },
      });
      const data = await response.json();
      setPlayers(data);
      setIsLoggedIn(true);
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error(error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const fetchOnePlayer = async (playerId) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(url + `/api/players/${playerId}`, {
        headers: {
          Authorization: `Basic ${window.btoa(
            `${usernameState}:${passwordState}`
          )}`,
        },
      });
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

        const response = await fetch(url + "/api/players", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${window.btoa(
              `${usernameState}:${passwordState}`
            )}`,
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
      const response = await fetch(url + `/api/players/${selectedPlayer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${window.btoa(
            `${usernameState}:${passwordState}`
          )}`,
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
      const response = await fetch(url + `/api/players/${playerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${window.btoa(
            `${usernameState}:${passwordState}`
          )}`,
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
      <h3>Request Status</h3>
      <RequestStatus>{requestStatus}</RequestStatus>
      <AuthUser
        isLoggedIn={isLoggedIn}
        onLogin={loginUser}
        onRegister={registerUser}
        onLogout={logoutUser}
      />
      {isLoggedIn && <AddPlayer handleSubmit={handleAddPlayer} />}
      {isLoggedIn && (
        <ListPlayers players={players} getPlayer={fetchOnePlayer} />
      )}
      {isLoggedIn && (
        <SelectedPlayer
          player={selectedPlayer}
          handleUpdate={changePlayerStatus}
          handleDelete={deletePlayer}
        />
      )}
    </div>
  );
};

export default App;
