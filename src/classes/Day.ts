import EntryPair from "./EntryPair";

export default class Day {
  public date: Date;

  public morning: EntryPair[] = [];

  public afternoon: EntryPair[] = [];

  public evening: EntryPair[] = [];

  public night: EntryPair[] = [];

  constructor(date: Date) {
    this.date = date;
  }
}