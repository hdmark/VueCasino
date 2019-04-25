<template>
  <div>
    Deck
    <div v-for="(card,key) in cards" :key="key">{{card.rank}} - {{card.suit}}</div>
  </div>
</template>

<script>
export default {
  data() {
    console.log("data");
    return {};
  },
  computed: {
    cards() {
      return this.$store.getters.cards;
    }
  }
};
</script>
