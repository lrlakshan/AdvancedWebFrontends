<template>
  <li :id="'player-' + player.id">
    <a @click="handlePlayerClick" @keydown.enter.prevent="handlePlayerClick" style="cursor: pointer;" tabindex="0">
      {{ player.name }}
    </a>
  </li>
</template>

<script setup>

const props = defineProps(['player']);
const emit = defineEmits(['player-clicked']);

const handlePlayerClick = () => {
  emit('player-clicked', props.player.id);
};
</script>
