<template>
  <div class="container">
    <div class="columns">
      <Drink
        v-for="drink in drinks"
        :key="drink.id"
        :drink="drink"
        class="columns dg-gray m-2 p-2"
      >
        <span>{{ drink.name }}</span>
      </Drink>
    </div>
  </div>
</template>

<script>
import Drink from "@/components/Drink";

export default {
  data() {
    return {
      drinks: []
    };
  },

  components: {
    Drink
  },

  created: function() {
    this.refreshDrinkList();
  },

  methods: {
    refreshDrinkList: function() {
      const self = this;
      const API_BASE = process.env.VUE_APP_API_URL;

      fetch(`${API_BASE}/drink`)
        .then(resp => resp.json())
        .then(result => {
          if (result.status != "success") {
            throw new Error(result.messages[0]);
          }

          self.drinks = result.data.drinks;
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>
