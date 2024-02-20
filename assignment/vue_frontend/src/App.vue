<template>
  <div :data-testid="dataTestIds.app">
    <footer>
      <p>Copyright &copy; 2024</p>
    </footer>
  </div>
</template>

<script>
import { dataTestIds } from "./tests/constants/components.js";

export default {
  setup() {
    return {
      dataTestIds,
    };
  },
};
</script>
