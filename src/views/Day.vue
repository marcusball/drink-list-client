<template>
  <div class="container">
    <DateTabs :date="date" v-on:date-changed="onDateChanged"></DateTabs>

    <DayComponent :day="day"> </DayComponent>

    <NewEntryForm :date="date" @new-entry="onNewEntryCreated"></NewEntryForm>
  </div>
</template>

<script lang="ts">
import DateTabs from "@/components/DateTabs";
import DayComponent from "@/components/Day";
import EntryPair from "@/classes/EntryPair";
import DayEntries from "@/classes/Day";
import NewEntryForm from "@/components/NewEntryForm";

import { Component, Vue, Prop } from "vue-property-decorator";
import { JsonConvert } from "json2typescript";
import format from "date-fns/format";
import parse from "date-fns/parse";

@Component({
  components: {
    DateTabs,
    DayComponent,
    NewEntryForm
  }
})
export default class Day extends Vue {
  date: Date;

  entries: EntryPair[] = [];

  constructor() {
    super();
    this.date = new Date();
    this.date.setHours(0, 0, 0, 0);
  }

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
  }

  getEntriesForDate(date: Date): Promise<EntryPair[]> {
    const self = this;
    const API_BASE = process.env.VUE_APP_API_URL;

    return fetch(`${API_BASE}/drink/${format(date, "yyyy-LL-dd")}`)
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
  }

  onDateChanged(newDate: Date) {
    let self = this;

    // @TODO: Loading

    this.getEntriesForDate(newDate)
      .then(entries => {
        this.entries = entries;
        this.setDate(newDate);
      })
      .catch(err => alert(err));
  }

  onNewEntryCreated(newEntry: EntryPair) {
    this.entries.push(newEntry);
  }

  /**
   * Set the new `date` this Day is representing,
   * and update the current URL in the $router.
   */
  private setDate(date: Date) {
    this.date = date;

    this.$router.push({
      name: "drinks-date",
      params: {
        year: format(this.date, "yyyy"),
        month: format(this.date, "LL"),
        day: format(this.date, "dd")
      }
    });
  }

  get day() {
    let day = new DayEntries(this.date);

    for (const entryPair of this.entries) {
      day.addEntryPair(entryPair);
    }

    return day;
  }
}
</script>