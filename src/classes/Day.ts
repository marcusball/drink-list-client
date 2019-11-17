import Entry from "./Entry";

export default class Day {
  public date: Date;

  public morning: Entry[] = [];

  public afternoon: Entry[] = [];

  public evening: Entry[] = [];

  public night: Entry[] = [];

  constructor(date: Date) {
    this.date = date;
  }
}