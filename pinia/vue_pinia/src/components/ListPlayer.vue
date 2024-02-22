<!-- 
  Copy paste your code from the ListPlayer.vue file here from the players_CRUD exercise of the Vue week.

  BEWARE: Only the player is passed to this component as a prop from now on. All the other data is fetched and updated in the redux store. Meaning you need to implement a method in the Pinia store that fetches the player when it is clicked and selects it as the selected player.
-->

<template>
  <li v-if="player" :id="'player-' + player.id">
    <a @click="handlePlayerClick" @keydown.enter.prevent="handlePlayerClick" style="cursor: pointer;" tabindex="0">
      {{ player.name }}
    </a>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';
import { usePlayerStore } from '../pinia/playerStore';

const props = defineProps(['player']);

const playerStore = usePlayerStore();

const handlePlayerClick = () => {
  playerStore.fetchSelectedPlayer(props.player.id);
};
</script>
