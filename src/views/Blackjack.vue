<template>
  <div>
    <div class="info">
      <h3>Blackjack</h3>
      <h5>Funds {{money}}</h5>
      <div>{{cardsLeft}}</div>
      <div>{{gameOutcome}}</div>
      <button @click="newGame">New Game</button>
      <button @click="shuffle">Shuffle</button>
      <button @click="hit" :disabled="!playerActive">Hit</button>
      <button @click="stand" :disabled="!playerActive">Stand</button>
    </div>

    <div class="hands">
      <div class="player">
        <h3>{{playerScore}}</h3>
        <Hand person="player"></Hand>
      </div>
      <div class="dealer">
        <h4>{{dealerScore}}</h4>
        <hand person="dealer"></hand>
      </div>
    </div>
    <hr>
    <!-- <Deck></Deck> -->
  </div>
</template>

<script>
import Deck from "../components/Deck";
import Hand from "../components/Hand";
export default {
  components: {
    Deck,
    Hand
  },
  data() {
    return {
      playerActive: 1,
      gameOutcome: "",
      money: 0
    };
  },
  mounted() {
    this.$store.dispatch("createDeck");
  },
  computed: {
    playerScore() {
      if (this.player.length > 0) {
        return this.calcScore(this.player);
      }
      return 0;
    },
    dealerScore() {
      if (this.dealer.length > 0) {
        return this.calcScore(this.dealer);
      }
      return 0;
    },
    cardsLeft() {
      console.log(this.cards);
      if (this.cards != [] && this.cards.length < 1) {
        this.playerActive = 1;
        this.$store.dispatch("newGame");
      }
      return this.cards.length;
    },
    cards() {
      return this.$store.getters.deck;
    },
    player() {
      return this.$store.getters.player;
    },
    dealer() {
      return this.$store.getters.dealer;
    }
  },
  methods: {
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
      this.$store.dispatch("drawCard", "player");
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
        this.$store.dispatch("drawCard", "dealer");
      }

      // determine outcome
      this.calcWinner();
    },
    calcWinner: function() {
      if (this.playerScore > 21) {
        this.gameOutcome = "Bust";
        // this.money++;
      } else if (this.dealerScore > 21) {
        this.gameOutcome = "Win";
        this.money += 2;
      } else if (this.dealerScore > this.playerScore) {
        this.gameOutcome = "Lose";
        // this.money;
      } else if (this.dealerScore == this.playerScore) {
        this.gameOutcome = "Push";
        this.money++;
      } else {
        this.gameOutcome = "win";
        this.money += 2;
      }
    },
    newGame: function() {
      this.playerActive = 1;
      this.money--;
      this.gameOutcome = "";
      this.$store.dispatch("newGame");
      this.dealPlayer();
      this.dealDealer();
      this.dealPlayer();
      this.dealDealer();
    },
    shuffle: function() {
      this.$store.dispatch("shuffleDeck");
    },
    dealPlayer: function() {
      this.$store.dispatch("drawCard", "player");
    },
    dealDealer: function() {
      this.$store.dispatch("drawCard", "dealer");
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


