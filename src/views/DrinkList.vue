<template>
  <div class="container">
    <DayComponent
      v-for="day in groupedDrinkList"
      :key="day.date.getTime()"
      :day="day"
      @update:drink="updateEntry"
    >
    </DayComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { JsonConvert } from "json2typescript";
import DayComponent from "../components/DayComponent.vue";
import Entry from "@/classes/Entry";
import Day from "@/classes/Day";
import EntryPair from "@/classes/EntryPair";


export default defineComponent({
  components: {
    DayComponent,
  },

  data() {
    return {
      entries: [],
    } as {
      entries: EntryPair[]
    };
  },

  created() {
    this.refreshDrinkList();
  },

  methods: {
    refreshDrinkList() {
      const API_BASE = process.env.VUE_APP_API_URL;

      fetch(`${API_BASE}/drinks`)
        .then(resp => resp.json())
        .then(result => {
          if (result.status != "success") {
            throw new Error(result.messages[0]);
          }

          let jsonConvert: JsonConvert = new JsonConvert();

          let drinks: EntryPair[] = [];

          drinks = jsonConvert.deserializeArray(result.data.drinks, EntryPair);

          this.entries = drinks;
        })
        .catch(err => {
          alert(err);
        });
    },

    updateEntry(entry: EntryPair) {
      const entryId = entry.entry!.id;

      const entryIndex = this.entries.findIndex(e => e.entry!.id == entryId);

      if (entryIndex == -1) {
        return;
      }

      this.entries.splice(entryIndex, 1, entry);
    }
  },

  computed: {
    /**
     * Get all of the `drinks` grouped by `Day`.
     *
     * @returns Day[]
     */
    groupedDrinkList(): Day[] {
      let days: Day[] = [];

      // Which date was the last one processed from the `drinks` array.
      let currentDate = null;
      for (const entryPair of this.entries) {
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

        day.addEntryPair(entryPair);
      }

      return days;
    }
  }
});

</script>
