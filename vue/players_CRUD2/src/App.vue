<template>
  <div>
    <AuthUser :isLoggedIn="isLoggedIn" @login="loginUser" @register="registerUser" @logout="logoutUser"></AuthUser>
    <RequestStatus v-slot:status>{{ requestStatus }}</RequestStatus>
    <AddPlayer v-if="isLoggedIn" @add-player="handleAddPlayer" />
    <ListPlayers v-if="isLoggedIn" :players="players" :getPlayer="fetchOnePlayer"></ListPlayers>
    <SelectedPlayer v-if="isLoggedIn" :player="selectedPlayer" @put-player="changePlayerStatus"
      @delete-player="deletePlayer">
    </SelectedPlayer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AuthUser from './components/AuthUser.vue';
import RequestStatus from './components/RequestStatus.vue';
import AddPlayer from './components/AddPlayer.vue';
import ListPlayers from './components/ListPlayers.vue';
import SelectedPlayer from './components/SelectedPlayer.vue';

const REQ_STATUS = {
  loading: "Loading...",
  success: "Finished!",
  error: "An error has occurred!!!",
};

const players = ref([]);
const selectedPlayer = ref(null);
const requestStatus = ref(null);
const isLoggedIn = ref(false);
const usernameState = ref('');
const passwordState = ref('');

const loginUser = async ({ username, password }) => {
  usernameState.value = username;
  passwordState.value = password;
  await fetchAllPlayers();
};

const registerUser = async ({ username, password }) => {
  try {
    requestStatus.value = REQ_STATUS.loading;
    const response = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    usernameState.value = username;
    passwordState.value = password;
    requestStatus.value = REQ_STATUS.success;
    await fetchAllPlayers();

  } catch (error) {
    console.error(error);
    requestStatus.value = REQ_STATUS.error;
    isLoggedIn.value = false;
  }
};

const logoutUser = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  isLoggedIn.value = false;
  players.value = [];
  selectedPlayer.value = null;
  requestStatus.value = null;
};

const fetchAllPlayers = async () => {
  try {
    requestStatus.value = REQ_STATUS.loading;
    const response = await fetch('http://localhost:3001/api/players', {
      headers: {
        'Authorization': `Basic ${window.btoa(`${usernameState.value}:${passwordState.value}`)}`
      }
    });
    const data = await response.json();
    players.value = data;
    isLoggedIn.value = true;
    requestStatus.value = REQ_STATUS.success;
  } catch (error) {
    console.error(error);
    requestStatus.value = REQ_STATUS.error;
  }
};

const fetchOnePlayer = async (playerId) => {
  try {
    requestStatus.value = REQ_STATUS.loading;
    const response = await fetch(`http://localhost:3001/api/players/${playerId}`, {
      headers: {
        'Authorization': `Basic ${window.btoa(`${usernameState.value}:${passwordState.value}`)}`
      }
    });
    const data = await response.json();
    selectedPlayer.value = data;
    requestStatus.value = REQ_STATUS.success;
  } catch (error) {
    console.error(error);
    requestStatus.value = REQ_STATUS.error;
  }
};

const handleAddPlayer = async (newPlayerName) => {
  if (newPlayerName.trim() !== "") {
    try {
      requestStatus.value = REQ_STATUS.loading;
      const newPlayer = {
        name: newPlayerName,
        isActive: false,
      };

      const response = await fetch('http://localhost:3001/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${window.btoa(`${usernameState.value}:${passwordState.value}`)}`
        },
        body: JSON.stringify(newPlayer),
      });

      const createdPlayer = await response.json();
      players.value.push(createdPlayer);
      requestStatus.value = REQ_STATUS.success;

    } catch (error) {
      console.error(error);
      requestStatus.value = REQ_STATUS.error;
    }
  }
};

const changePlayerStatus = async (isActive) => {
  try {
    requestStatus.value = REQ_STATUS.loading;
    const response = await fetch(`http://localhost:3001/api/players/${selectedPlayer.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${window.btoa(`${usernameState.value}:${passwordState.value}`)}`
      },
      body: JSON.stringify({ isActive }),
    });
    const data = await response.json();
    selectedPlayer.value = data;
    requestStatus.value = REQ_STATUS.success;
  } catch (error) {
    console.error(error);
    requestStatus.value = REQ_STATUS.error;
  }
}

const deletePlayer = async (playerId) => {
  try {
    requestStatus.value = REQ_STATUS.loading;
    const response = await fetch(`http://localhost:3001/api/players/${playerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${window.btoa(`${usernameState.value}:${passwordState.value}`)}`
      },
    });
    selectedPlayer.value = null;
    players.value = players.value.filter(player => player.id !== playerId);
    requestStatus.value = REQ_STATUS.success;
  } catch (error) {
    console.error(error);
    requestStatus.value = REQ_STATUS.error;
  }
}
</script>

