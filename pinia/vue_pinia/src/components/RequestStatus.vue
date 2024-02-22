<!-- 
  Copy paste your code from the RequestStatus.vue file here from the players_CRUD exercise of the Vue week.

  BEWARE: No slots are passed to this component from now on. Instead, all the needed data is fetched from the Pinia store. Therefore, use it to get the request status from the store.
 -->

<template>
  <h3>Request Status</h3>
  <div id="request-status">
    <p>{{ requestStatus }}</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { usePlayerStore } from "../pinia/playerStore"

export default {
  setup() {
    const store = usePlayerStore();

    const requestStatus = computed(() => store.getRequestStatus);

    return { requestStatus };
  }
};
</script>
