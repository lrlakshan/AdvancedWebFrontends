<template>
  <div>
    <RequestStatus v-slot:status>{{ requestStatus }}</RequestStatus>
    <AddPlayer @add-player="handleAddPlayer" />
    <ListPlayers :players="players" :getPlayer="fetchOnePlayer"></ListPlayers>
    <SelectedPlayer :player="selectedPlayer" @put-player="changePlayerStatus" @delete-player="deletePlayer">
    </SelectedPlayer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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

const fetchAllPlayers = async () => {
  try {
    requestStatus.value = REQ_STATUS.loading;
    const response = await fetch('http://localhost:3001/api/players');
    const data = await response.json();
    players.value = data;
    requestStatus.value = REQ_STATUS.success;
  } catch (error) {
    console.error(error);
    requestStatus.value = REQ_STATUS.error;
  }
};

const fetchOnePlayer = async (playerId) => {
  try {
    requestStatus.value = REQ_STATUS.loading;
    const response = await fetch(`http://localhost:3001/api/players/${playerId}`);
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

onMounted(() => {
  fetchAllPlayers();
});
</script>
