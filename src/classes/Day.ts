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
      throw new Error(
        "Assertion failed: mismatched dates! " +
        format(this.date, "yyyy-LL-dd") +
        " vs " +
        format(entryPair.entry!.drankOn!, "yyyy-LL-dd")
      );
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

  updateDrink(drink: EntryPair) {
    Day.updateEntryInTimePeriod(this.morning, drink) ||
      Day.updateEntryInTimePeriod(this.afternoon, drink) ||
      Day.updateEntryInTimePeriod(this.evening, drink) ||
      Day.updateEntryInTimePeriod(this.night, drink);
  }

  static updateEntryInTimePeriod(
    timePeriod: EntryPair[],
    entry: EntryPair
  ): boolean {
    const entryId = entry.entry!.id;

    if (!entryId) return false;

    let index = Day.findById(timePeriod, entryId);
    if (index >= 0) {
      timePeriod.splice(index, 1, entry);
      return true;
    }
    return false;
  }

  /**
   *
   * @param timePeriod The time period in which to search for the entry
   * @param entryId The ID of the entry for which to search.
   * @return The index of the Entry in the `timePeriod` array, if found; otherwise, `-1`.
   */
  static findById(timePeriod: EntryPair[], entryId: number): number {
    return timePeriod.findIndex(drink => drink.entry!.id == entryId);
  }
}
