import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Deck from './classes/Deck';
import { create } from 'domain';
export default new Vuex.Store({
  state: {
    deck: [],
    cards: [],
    dealerHand: [],
    playerHand: [],
    gameStatus: '',
  },
  mutations: {
    create(state, payload) {
      state.deck = Deck.buildDeck();
    },

    clearHands(state, payload) {
      state.dealerHand = [];
      state.playerHand = [];
    },

    shuffle(state, payload) {
      state.deck = Deck.shuffle(state.deck);
    },
    draw(state, payload) {
      let card = Deck.drawCard(state.deck);

      if (payload == 'player') {
        state.playerHand.push(card);
      } else if (payload == 'dealer') {
        state.dealerHand.push(card);
      }
    },
    setCards(state, payload) {
      state.cards = [];
      state.cards = state.deck;
    },
  },
  actions: {
    createDeck({ commit, state }, payload) {
      commit('create');
      commit('setCards');
    },
    shuffleDeck({ commit, state }, payload) {
      commit('shuffle');
      commit('setCards');
    },
    drawCard({ commit, state }, payload) {
      commit('draw', payload);
    },
    newGame({ commit, state }, payload) {
      commit('create');
      commit('shuffle');
      commit('clearHands');
      commit('setCards');
    },
  },
  getters: {
    player(state) {
      return state.playerHand;
    },
    dealer(state) {
      return state.dealerHand;
    },
    deck(state) {
      return state.deck;
    },
  },
});
