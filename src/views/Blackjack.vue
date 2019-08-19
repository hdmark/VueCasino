<template>
  <div>
    <div class="info">
      <h3>Blackjack</h3>
      <h5>Funds {{funds}}</h5>
      <div>{{gameOutcome}}</div>
      <button @click="dealGame">Deal New Game</button>
      <button @click="shuffle">Shuffle</button>
      <button @click="hit" :disabled="!playerActive && gameActive">Hit</button>
      <button @click="stand" :disabled="!playerActive && gameActive">Stand</button>
    </div>

    <div class="hands">
      <div class="player">
        <h3>{{playerScore}}</h3>
        <div v-for="(card,key) in playerHand" :key="key">{{card.rank}} - {{card.suit}}</div>
      </div>
      <div class="dealer">
        <h4>{{dealerScore}}</h4>
        <div v-for="(card,key) in dealerHand" :key="key">{{card.rank}} - {{card.suit}}</div>
      </div>
    </div>
    <hr>

    <div v-for="(card,key) in deck" :key="key">{{card.rank}} - {{card.suit}}</div>
  </div>
</template>

<script>
import Deck from "../classes/Deck";
export default {
  data() {
    return {
      deck: [],
      playerHand: [],
      dealerHand: [],
      discardPile: [],
      playerActive: 1,
      gameOutcome: "",
      money: 0,
      gameActive: 0
    };
  },
  mounted() {
    this.initialize();
    // this.$store.dispatch("createDeck");
  },
  computed: {
    playerScore() {
      if (this.playerHand.length > 0) {
        return this.calcScore(this.playerHand);
      }
      return 0;
    },
    dealerScore() {
      if (this.dealerHand.length > 0) {
        return this.calcScore(this.dealerHand);
      }
      return 0;
    },
    funds() {
      return this.$store.getters.funds;
    }
  },
  methods: {
    initialize: function() {
      this.playerActive = 1;
      this.gameOutcome = "";
      this.deck = Deck.buildDeck();
      this.gameActive = 0;
    },
    calcScore: function(arr) {
      let sum = 0;

      // loop through ignoring aces
      for (let card of arr) {
        if (card.rank == "Ace") {
          continue;
        } else if (["Jack", "Queen", "King"].indexOf(card.rank) >= 0) {
          sum += 10;
        } else {
          sum += card.rank;
        }
      }

      // go back and add in aces
      for (let card of arr) {
        if (card.rank == "Ace") {
          if (sum <= 10) {
            sum += 11;
          } else {
            sum += 1;
          }
        }
      }
      return sum;
    },

    hit: function() {
      // draw card, determine if bust
      this.playerHand.push(Deck.drawCard(this.deck));

      if (this.playerScore > 21) {
        this.playerActive = 0;
        //this.gameOutcome = "BUST";
        this.calcWinner();
      }
    },
    stand: function() {
      // player turn over
      this.playerActive = 0;

      // hit till 17
      while (this.dealerScore <= 17) {
        this.dealerHand.push(Deck.drawCard(this.deck));
      }

      // determine outcome
      this.calcWinner();
    },

    dealGame: function() {
      this.playerActive = 1;
      this.gameActive = 1;
      this.gameOutcome = "";
      this.playerHand = [];
      this.dealerHand = [];
      this.deck = Deck.buildDeck();
      this.$store.dispatch("updateFunds", -1);
      this.shuffle();
      this.dealPlayer();
      this.dealDealer();
      this.dealPlayer();
      this.dealDealer();
      if (this.playerScore == 21) {
        this.gameOutcome = "BLACKJACK!";
        this.$store.dispatch("updateFunds", 3);
      }
    },
    shuffle: function() {
      this.deck = Deck.shuffle(this.deck);
    },
    dealPlayer: function() {
      this.playerHand.push(Deck.drawCard(this.deck));
    },
    dealDealer: function() {
      this.dealerHand.push(Deck.drawCard(this.deck));
      // this.$store.dispatch("drawCard", "dealer");
    },
    calcWinner: function() {
      let pot = 0;
      if (this.playerScore > 21) {
        this.gameOutcome = "Bust";
      } else if (this.dealerScore > 21) {
        this.gameOutcome = "Win";
        pot = 2;
      } else if (this.dealerScore > this.playerScore) {
        this.gameOutcome = "Lose";
      } else if (this.dealerScore == this.playerScore) {
        this.gameOutcome = "Push";
        pot = 1;
      } else {
        this.gameOutcome = "win";
        pot = 2;
      }
      this.$store.dispatch("updateFunds", pot);
      this.gameActive = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.hands {
  display: flex;
  justify-content: space-around;
  // align-items: center;
}
</style>


