<template>
  <div class="columns">
    <div class="column col-1 text-left">
      <sub v-for="context in drink.entry.context" :key="context">{{
        context
      }}</sub>
    </div>
    <div class="column col-1 text-left">
      <span>{{ drink.entry.quantityString }}</span>
      <button class="btn" @click="incrementQuantity">+</button>
    </div>
    <div class="column col-3 text-left">
      <span>{{ drink.entry.name }}</span>
    </div>
    <div class="column col-1 text-left">
      <span>{{ drink.entry.abvString }}</span>
    </div>
    <div class="column col-2 text-left">
      <span>{{ drink.entry.volumeString }}</span>
    </div>
    <div class="column col-2 text-left">
      <span>{{ drink.aggregate.drinksString }} drinks</span>
    </div>
    <div class="column col-2 text-left">
      <span>{{ drink.aggregate.volumeString }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import EntryPair from "@/classes/EntryPair";
import { JsonConvert } from "json2typescript";

export default defineComponent({
  props: {
    drink: Object as PropType<EntryPair>,
  },

  methods: {
    incrementQuantity() {
      const API_BASE = process.env.VUE_APP_API_URL;
      const drinkId = this.drink!.entry!.id; // @TODO: Fix types to remove ! assertion?

      fetch(`${API_BASE}/drinks/${drinkId}/increment`, {
        method: "PUT"
      })
        .then(response => response.json())
        .then(result => {
          if (result.status == "success") {
            let jsonConvert: JsonConvert = new JsonConvert();
            let entry: EntryPair = jsonConvert.deserializeObject(
              result.data.aggregated_entry,
              EntryPair
            );

            this.$emit("update:drink", entry);
          }
        })
        .catch(err => {
          alert(err);
        });
    },
  }
});

</script>
