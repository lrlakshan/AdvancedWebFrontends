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
  actions: {
    async fetchSelectedPlayer(playerId) {
      try {
        this.reqStatus = REQ_STATUS.loading;
        const response = await fetch(`${this.playersURL}/${playerId}`);
        const data = await response.json();
        this.selectedPlayer = data;
        this.reqStatus = REQ_STATUS.success;
      } catch (error) {
        console.error(error);
        this.reqStatus = REQ_STATUS.error;
      }
    },
    async fetchPlayers() {
      try {
        this.reqStatus = REQ_STATUS.loading;
        const response = await fetch(this.playersURL);
        const data = await response.json();
        this.players = data;
        this.reqStatus = REQ_STATUS.success;
      } catch (error) {
        console.error(error);
        this.reqStatus = REQ_STATUS.error;
      }
    },
    async addPlayer(player) {
      try {
        this.reqStatus = REQ_STATUS.loading;
        const response = await fetch(this.playersURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(player),
        });
        const data = await response.json();
        this.players.push(data);
        this.reqStatus = REQ_STATUS.success;
      } catch (error) {
        console.error(error);
        this.reqStatus = REQ_STATUS.error;
      }
    },
    async updatePlayer(player, isActive) {
      try {
        this.reqStatus = REQ_STATUS.loading;
        const response = await fetch(`${this.playersURL}/${player.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive }),
        });
        const data = await response.json();
        this.selectedPlayer = data;
        const index = this.players.findIndex(p => p.id === player.id);
        if (index !== -1) {
          this.players[index] = data;
        }
        this.reqStatus = REQ_STATUS.success;
      } catch (error) {
        console.error(error);
        this.reqStatus = REQ_STATUS.error;
      }
    },
    async deletePlayer(id) {
      try {
        this.reqStatus = REQ_STATUS.loading;
        this.selectedPlayer = null;
        const response = await fetch(`${this.playersURL}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          this.players = this.players.filter((player) => player.id !== id);
          this.reqStatus = REQ_STATUS.success;
        }
      } catch (error) {
        console.error(error);
        this.reqStatus = REQ_STATUS.error;
      }
    },
  },
  getters: {
    allPlayers() {
      return this.players;
    },
    getSelectedPlayer() {
      return this.selectedPlayer;
    },
    getRequestStatus() {
      return this.reqStatus;
    },
  },
});
