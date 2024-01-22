<template>
    <li :id="'player-' + player.id">
      <a @click="handlePlayerClick" @keydown.enter.prevent="handlePlayerClick" style="cursor: pointer;" tabindex="0">
        {{ player.name }}
      </a>
    </li>
</template>

<script setup>

// Define props
const props = defineProps(['player']);
const emit = defineEmits(['player-clicked']);

// Define methods
const handlePlayerClick = () => {
  // Emit "player-clicked" event with the player's id as an argument
  emit('player-clicked', props.player.id);
};
</script>

