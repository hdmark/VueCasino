import Card from './Card';

let Deck = {
  // cards = [],

  buildDeck: () => {
    let suits = ['hearts', 'spades', 'diamonds', 'clubs'];
    let ranks = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    let deck = [];
    let id = 0;
    for (let suit of suits) {
      for (let rank of ranks) {
        // card = new Card(suit,rank)
        deck.push(new Card(suit, rank, id));
        id++;
      }
    }
    return deck;
  },
  displayCards: deck => {
    return deck;
  },

  drawCard: deck => {
    return deck.shift();
  },

  shuffle: deck => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  },
};

export default Deck;
