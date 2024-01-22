<template>
  <div v-if="player" id="selected-player">
    <div id="player-name">{{ player.name }}</div>
    <div id="player-status">{{ player.isActive ? 'active' : 'inactive' }}</div>
  </div>
</template>

<script setup>
const props = defineProps(["player"])
</script>