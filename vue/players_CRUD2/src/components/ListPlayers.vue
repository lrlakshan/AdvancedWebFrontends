<template>
  <div>
    <h2>List of Players</h2>
    <ul id="players-list">
      <ListPlayer v-for="player in players" :key="player.id" :player="player" @player-clicked="handlePlayerClicked" />
    </ul>
  </div>
</template>

<script setup>
import ListPlayer from './ListPlayer.vue';

const props = defineProps(['players', 'getPlayer']);

const handlePlayerClicked = (playerId) => {
  props.getPlayer(playerId);
};
</script>

