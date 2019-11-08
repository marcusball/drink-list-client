<template>
  <div class="columns">
    <div class="col-6">
      {{ drink.drankOn }}, {{ drink.name }}, {{ drink.minAbv.num }}%,
      {{ drink.volume[0].num }} {{ drink.volume[1] }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Entry } from "@/classes/Entry";

@Component({})
export default class Drink extends Vue {
  @Prop()
  private drink!: Entry;
}
</script>
