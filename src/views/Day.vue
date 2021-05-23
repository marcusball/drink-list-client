<template>
  <div class="container">
    <DateTabs :date="date" v-on:date-changed="onDateChanged"></DateTabs>

    <DayComponent :day="day" @update:drink="updateEntry" :enableDayLink="false"> </DayComponent>

    <NewEntryForm :date="date" @new-entry="onNewEntryCreated"></NewEntryForm>
  </div>
</template>

<script lang="ts">
import DateTabs from "@/components/DateTabs.vue";
import DayComponent from "@/components/DayComponent.vue";
import EntryPair from "@/classes/EntryPair";
import DayEntries from "@/classes/Day";
import NewEntryForm from "@/components/NewEntryForm.vue";

import { defineComponent, PropType } from "vue";
import { JsonConvert } from "json2typescript";
import format from "date-fns/format";
import parse from "date-fns/parse";

interface DayData {
  date: Date,
  entries: EntryPair[],
};

export default defineComponent({
  components: {
    DateTabs,
    DayComponent,
    NewEntryForm,
  },

  data(): DayData {
    let d = new Date();
    d.setHours(0, 0, 0, 0);

    return {
      date: d,
      entries: [],
    } as DayData;
  },

  created() {
    if (this.$route.params.year) {
      this.date = parse(
        `${this.$route.params.year}-${this.$route.params.month}-${this.$route.params.day}`,
        "yyyy-LL-dd",
        new Date()
      );
    }

    this.getEntriesForDate(this.date)
      .then(entries => {
        this.entries = entries;
      })
      .catch(err => alert(err));
  },

  methods: {
    getEntriesForDate(date: Date): Promise<EntryPair[]> {
      const API_BASE = process.env.VUE_APP_API_URL;

      return fetch(`${API_BASE}/days/${format(date, "yyyy-LL-dd")}`)
        .then(resp => resp.json())
        .then(result => {
          if (result.status != "success") {
            throw new Error(result.messages[0]);
          }

          let jsonConvert: JsonConvert = new JsonConvert();

          let drinks: EntryPair[] = [];

          drinks = jsonConvert.deserializeArray(result.data.drinks, EntryPair);

          return drinks;
        });
    },

    onDateChanged(newDate: Date) {
      // @TODO: Loading

      this.getEntriesForDate(newDate)
        .then(entries => {
          this.entries = entries;
          this.setDate(newDate);
        })
        .catch(err => alert(err));
    },

    onNewEntryCreated(newEntry: EntryPair) {
      this.entries.push(newEntry);
    },

    /**
     * Set the new `date` this Day is representing,
     * and update the current URL in the $router.
     */
    setDate(date: Date) {
      this.date = date;

      this.$router.push({
        name: "drinks-date",
        params: {
          year: format(this.date, "yyyy"),
          month: format(this.date, "LL"),
          day: format(this.date, "dd")
        }
      });
    },

    updateEntry(entry: EntryPair) {
      const entryId = entry.entry!.id;

      const entryIndex = this.entries.findIndex(e => e.entry!.id == entryId);

      if (entryIndex == -1) {
        return;
      }

      this.entries.splice(entryIndex, 1, entry);
    },
  },

  computed: {
    day(): DayEntries {
      let day = new DayEntries(this.date);

      for (const entryPair of this.entries) {
        day.addEntryPair(entryPair);
      }

      return day;
    },
  },
});

</script>
