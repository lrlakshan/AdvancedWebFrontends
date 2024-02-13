<!-- 
 * You can copy paste the App.vue file logic from the players-CRUD Vue-exercise to get started. In this exercise, you will be introducing pinia, which is a Vue 3 store that is inspired by Vuex. You will be using pinia to manage the state of the application.
 *
 * Since all the state will be managed by pinia, you will need to remove the state management code from the App.vue file. You will also need to remove the fetch functions from the App.vue file. The fetch functions will be moved into Pinia's store. Each action in pinia will be responsible for handling the request while keeping the application up to date with loading, success, and failure actions. You can name the action creators anything, but it is recommended to name them based on the component that will be using them.
 *
 * You can find the template file for the store in src/pinia/playerStore.js. You will need to create the actions to handle the HTTP requests, and getters to access the store data. You will also need to create the getters to get the state of the application.

 Once you are finished, the Application should still work the same way as it did before, meaning you can add, delete, and select players. The only difference is that the state will be managed by pinia.
 -->

<template>
  <AppTitle />
  <!-- No need to touch this component -->
  <RequestStatus />
  <!-- No longer being passed props or slots -->
  <AddPlayer />
  <!-- No longer being passed props or slots -->
  <ListPlayers />
  <!-- No longer being passed props or slots -->
  <SelectedPlayer />
  <!-- No longer being passed props or slots -->
</template>

<script>
import AddPlayer from "./components/AddPlayer.vue";
import ListPlayers from "./components/ListPlayers.vue";
import ListPlayer from "./components/ListPlayer.vue";
import SelectedPlayer from "./components/SelectedPlayer.vue";
import RequestStatus from "./components/RequestStatus.vue";
import AppTitle from "./AppTitle.vue";

export default {
  components: {
    AddPlayer,
    ListPlayers,
    ListPlayer,
    SelectedPlayer,
    RequestStatus,
    AppTitle,
  },
};
</script>
