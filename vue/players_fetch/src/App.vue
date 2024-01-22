<template>
  <div>
    <RequestStatus v-slot:status>{{ requestStatus }}</RequestStatus>
    <ListPlayers :players="players" :getPlayer="fetchOnePlayer"></ListPlayers>
    <SelectedPlayer :player="selectedPlayer"></SelectedPlayer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RequestStatus from './components/RequestStatus.vue';
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

onMounted(() => {
  fetchAllPlayers();
});
</script>



