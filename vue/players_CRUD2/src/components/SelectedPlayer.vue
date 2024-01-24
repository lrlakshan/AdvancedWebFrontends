<template>
  <h3 v-if="player">Selected Player</h3>
  <h3 v-else="player">No Player Selected</h3>
  <div v-if="player" id="selected-player">
    <div class="player-id">{{ player.id }}</div>
    <div id="player-name">{{ player.name }}</div>
    <div id="player-status">
      <label for="checkbox" id="checkbox-label">
        <input type="checkbox" id="checkbox" :checked="playerCurrentStatus" @change="handleCheckboxChange" />
        <span class="checkmark"></span>
        {{ playerCurrentStatus ? 'active' : 'inactive' }}
      </label>
    </div>
    <div>
      <button class="btn-update" :disabled="playerCurrentStatus === player.isActive" @click="updatePlayer">
        Update
      </button>
      <button class="btn-delete" @click="deletePlayer">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(["player"]);
const emit = defineEmits(['put-player', 'delete-player']);

const playerCurrentStatus = ref(props.player?.isActive);

const handleCheckboxChange = () => {
  playerCurrentStatus.value = !playerCurrentStatus.value;
};

const updatePlayer = () => {
  if (playerCurrentStatus !== props.player.isActive) {
    emit("put-player", playerCurrentStatus.value);
  }
};

const deletePlayer = () => {
  emit("delete-player", props.player.id);
};

watch(() => props.player, (newPlayer) => {
  playerCurrentStatus.value = newPlayer?.isActive;
});

</script>