<template>
  <div>
    {{person}}
    <div v-for="(card,key) in cards" :key="key">{{card.rank}} - {{card.suit}}</div>
  </div>
</template>

<script>
export default {
  props: ["person"],
  data() {
    console.log("data");
    return {};
  },
  computed: {
    cards() {
      if (this.person == "player") {
        return this.$store.getters.player;
      } else if (this.person == "dealer") {
        return this.$store.getters.dealer;
      }
    }
  }
};
</script>
