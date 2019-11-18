<template>
  <div>
    <h3>{{ formattedDate }}</h3>

    <div v-if="day.morning.length">
      <span>Morning</span>
      <Drink v-for="drink in day.morning" :key="drink.id" :drink="drink">
      </Drink>
    </div>

    <div v-if="day.afternoon.length">
      <span>Afternoon</span>
      <Drink v-for="drink in day.afternoon" :key="drink.id" :drink="drink">
      </Drink>
    </div>

    <div v-if="day.evening.length">
      <span>Evening</span>
      <Drink v-for="drink in day.evening" :key="drink.id" :drink="drink">
      </Drink>
    </div>

    <div v-if="day.night.length">
      <span>Night</span>
      <Drink v-for="drink in day.night" :key="drink.id" :drink="drink"> </Drink>
    </div>

    <div class="divider"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Day from "@/classes/Day";
import Drink from "@/components/Drink";

import format from "date-fns/format";

@Component({
  components: {
    Drink
  }
})
export default class DayComponent extends Vue {
  @Prop()
  private day!: Day;

  get formattedDate() {
    return format(this.day!.date, "d MMM yyyy");
  }
}
</script>