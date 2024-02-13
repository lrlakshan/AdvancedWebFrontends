import { defineStore } from "pinia";
import { REQ_STATUS } from "../../cypress/e2e/constants";

/**
 * This is the store for the players. It will be used to manage the state of the players and the requests to the server.
 * The store will have the following state:
 * - players: an array of players
 * - selectedPlayer: the player selected to be updated
 * - reqStatus: the status of the request to the server
 * - playersURL: the URL of the players API
 *
 * DO NOT MODIFY THE STATE. State names are required to be the same as mentioned above to pass the tests.
 *
 * The names of the getters, actions and mutations are up to you.
 */

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    /**LEAVE THE STATE AS IT IS*/ players: [],
    selectedPlayer: null,
    reqStatus: REQ_STATUS.loading,
    playersURL: "http://localhost:3001/api/players",
  }),
});
