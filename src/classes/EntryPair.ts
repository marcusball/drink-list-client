import { JsonObject, JsonProperty } from "json2typescript";
import Entry from "./Entry";
import Aggregate from "./Aggregate";


@JsonObject("EntryPair")
export default class EntryPair {
  @JsonProperty("entry", Entry)
  entry?: Entry;

  @JsonProperty("aggregate", Aggregate)
  aggregate?: Aggregate;

  constructor() {
    this.entry = undefined;
    this.aggregate = undefined;
  }
}