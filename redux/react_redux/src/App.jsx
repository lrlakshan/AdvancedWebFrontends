/** @format 
 * 
 * Student instructions:
 * Copy paste the App.jsx file from the previous exercises into this file. In this exercise, you will be introducing redux, which is a state management library that allows you to manage the state of your application in a single store. The store is a single source of truth for the state of your application, and it is the only place where the state can be updated. 
 * 
 * The fetch functions will start using action creators from now on. Each action creator will be responsible for updating the redux store with the data from the request. You can find the template files for the action creators in the src/redux/actionCreators folder. It is your job to implement them, as well as the reducers that will be used to update the store. The reducers can be found in the src/redux/reducers folder.
 * 
  Hint: Use the provided REQ_STATUS object to update the request status when necessary. "loading" for when the request is in progress, "success" for when the request is successful, and "error" for when the request has failed. The REQ_STATUS object is imported from the "../cypress/e2e/constants.js" file.

*/
const url = "http://localhost:3001/api/players";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { REQ_STATUS } from "../cypress/e2e/constants.js";

// Actions
import { setPlayers } from './redux/actionCreators/playersActions.js';
import { setStatus } from './redux/actionCreators/statusActions.js';
import { setSelectedPlayer } from './redux/actionCreators/selectedPlayerActions.js';

function App() {

  const fetchOnePlayer = async (playerId) => {
    try {
      dispatch(setStatus(REQ_STATUS.loading));
      const response = await fetch(url + "/" + playerId);
      const data = await response.json();
      dispatch(setSelectedPlayer(data));
      dispatch(setStatus(REQ_STATUS.success));
    } catch (error) {
      console.error(error);
      dispatch(setStatus(REQ_STATUS.error));
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        dispatch(setStatus(REQ_STATUS.loading));
        const response = await fetch(url);
        const data = await response.json();
        dispatch(setPlayers(data));
        dispatch(setStatus(REQ_STATUS.success));
      } catch (error) {
        console.error(error);
        dispatch(setStatus(REQ_STATUS.error));
      }
    };

    fetchAllPlayers();
  }, [dispatch]);
  return (
    <>
      <RequestStatus />
      <ListPlayers selectPlayer={fetchOnePlayer}/>
      <SelectedPlayer />
    </>
  );
}

export default App;
