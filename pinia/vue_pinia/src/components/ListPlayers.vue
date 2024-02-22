<!-- 

  Copy paste your code from the ListPlayers.vue file here from the players_CRUD exercise of the Vue week.

  BEWARE: No props are passed to this component from now on. Instead, all the needed data is fetched and updated in the Pinia store. Therefore, use it to get the players array from the store.
 -->
<template>
  <div>
    <h2>List of Players</h2>
    <ul id="players-list">
      <ListPlayer v-for="player in players" :key="player.id" :player="player"/>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import { usePlayerStore } from "../pinia/playerStore"
import ListPlayer from "./ListPlayer.vue"

export default {
  components: {
    ListPlayer,
  },
  setup() {
    const store = usePlayerStore();

    const players = computed(() => store.allPlayers);

    return { players };
  }
};
</script>
