<template>
  <div class="columns">
    <div class="col-6">
      {{ drink.drankOn }}, {{ drink.quantityString }}, {{ drink.name }},
      {{ drink.abvString }}%, {{ drink.volumeString }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Entry from "@/classes/Entry";

@Component({})
export default class Drink extends Vue {
  @Prop()
  private drink!: Entry;
}
</script>
