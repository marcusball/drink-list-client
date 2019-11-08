<template>
  <div class="container">
    <div class="columns">
      <Drink
        v-for="drink in drinks"
        :key="drink.id"
        :drink="drink"
        class="columns dg-gray m-2 p-2"
      >
      </Drink>
    </div>
  </div>
</template>

<script lang="ts">
import { JsonConvert } from "json2typescript";
import Drink from "@/components/Drink";
import Entry from "@/classes/Entry";

import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    Drink
  }
})
export default class DrinkList extends Vue {
  @Prop()
  drinks: Entry[] = [];

  created() {
    this.refreshDrinkList();
  }

  refreshDrinkList() {
    const self = this;
    const API_BASE = process.env.VUE_APP_API_URL;

    fetch(`${API_BASE}/drink`)
      .then(resp => resp.json())
      .then(result => {
        if (result.status != "success") {
          throw new Error(result.messages[0]);
        }

        let jsonConvert: JsonConvert = new JsonConvert();

        let drinks: Entry[] = [];

        drinks = jsonConvert.deserializeArray(result.data.drinks, Entry);

        self.drinks = drinks;
      })
      .catch(err => {
        alert(err);
      });
  }
}
</script>
