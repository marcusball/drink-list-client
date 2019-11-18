<template>
  <div class="container">
    <DayComponent
      v-for="day in groupedDrinkList"
      :key="day.date.getTime()"
      :day="day"
    >
    </DayComponent>
  </div>
</template>

<script lang="ts">
import { JsonConvert } from "json2typescript";
import DayComponent from "@/components/Day";
import Entry from "@/classes/Entry";
import Day from "@/classes/Day";
import EntryPair from "@/classes/EntryPair";

import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    DayComponent
  }
})
export default class DrinkList extends Vue {
  drinks: EntryPair[] = [];

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

        let drinks: EntryPair[] = [];

        drinks = jsonConvert.deserializeArray(result.data.drinks, EntryPair);

        self.drinks = drinks;
      })
      .catch(err => {
        alert(err);
      });
  }

  /**
   * Get all of the `drinks` grouped by `Day`.
   *
   * @returns Day[]
   */
  get groupedDrinkList() {
    let days = [];

    // Which date was the last one processed from the `drinks` array.
    let currentDate = null;
    for (const entryPair of this.drinks) {
      // If this entry's `drankOn` date is not the `currentDate`,
      // then we need to create a new Day object to contain this entry.
      if (
        currentDate == null ||
        currentDate.getTime() != entryPair.entry!.drankOn!.getTime()
      ) {
        // Satisfy typescript
        if (!entryPair.entry!.drankOn) {
          throw new Error("Drank on date was somehow undefined");
        }

        days.push(new Day(entryPair.entry!.drankOn));
        currentDate = entryPair.entry!.drankOn;
      }

      // Get the most recently created day.
      let day = days[days.length - 1];

      // Verify I didn't fuck up this algorithm.
      if (day.date.getTime() != entryPair.entry!.drankOn!.getTime()) {
        throw new Error("Assertion failed: mismatched dates!");
      }

      switch (entryPair.entry!.time!.toLowerCase()) {
        case "morning":
          day.morning.push(entryPair);
          break;
        case "afternoon":
          day.afternoon.push(entryPair);
          break;
        case "evening":
          day.evening.push(entryPair);
          break;
        case "night":
          day.night.push(entryPair);
          break;
        default:
          throw new Error("Unknown entry `time`: " + entryPair.entry!.time);
      }
    }

    return days;
  }
}
</script>
