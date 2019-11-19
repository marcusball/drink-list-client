import EntryPair from "./EntryPair";
import format from "date-fns/format";

export default class Day {
  public date: Date;

  public morning: EntryPair[] = [];

  public afternoon: EntryPair[] = [];

  public evening: EntryPair[] = [];

  public night: EntryPair[] = [];

  constructor(date: Date) {
    this.date = date;
  }

  /**
   * Add an entry to this Day. 
   * @param entryPair The entry pair to add to this day.
   */
  addEntryPair(entryPair: EntryPair) {
    // Verify I didn't fuck up this algorithm.
    if (this.date.getTime() != entryPair.entry!.drankOn!.getTime()) {
      throw new Error("Assertion failed: mismatched dates! " + format(this.date, 'yyyy-LL-dd') + " vs " + format(entryPair.entry!.drankOn!, "yyyy-LL-dd"));
    }

    switch (entryPair.entry!.time!.toLowerCase()) {
      case "morning":
        this.morning.push(entryPair);
        break;
      case "afternoon":
        this.afternoon.push(entryPair);
        break;
      case "evening":
        this.evening.push(entryPair);
        break;
      case "night":
        this.night.push(entryPair);
        break;
      default:
        throw new Error("Unknown entry `time`: " + entryPair.entry!.time);
    }
  }
}