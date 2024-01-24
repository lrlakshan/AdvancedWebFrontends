<template>
  <h3>Add Player</h3>
  <form id="submit-player" @submit.prevent="submitPlayer">
    <input type="text" id="input-player" v-model="newPlayerName" placeholder="Enter player name" required />
    <button type="submit" class="btn-add">Add Player</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['add-player']);

const newPlayerName = ref("");

const submitPlayer = () => {
  if (newPlayerName.value.trim() !== "") {
    emits("add-player", newPlayerName.value.trim());
    newPlayerName.value = "";
  }
};
</script>
