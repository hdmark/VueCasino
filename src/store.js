import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Deck from './classes/Deck';
import { create } from 'domain';
export default new Vuex.Store({
  state: {
    deck: [],

    funds: 10,
  },
  mutations: {
    setFunds(state, payload) {
      state.funds += payload;
    },
  },
  actions: {
    updateFunds({ commit, state }, payload) {
      commit('setFunds', payload);
    },
  },
  getters: {
    funds(state) {
      return state.funds;
    },
  },
});
