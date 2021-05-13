import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("ApproxNumber")
export default class ApproxNumber {
  @JsonProperty("num", Number)
  num: number;

  @JsonProperty("is_approximate", Boolean)
  isApproximate: boolean;

  constructor(num: number, isApproximate?: boolean) {
    this.num = num;
    this.isApproximate = isApproximate || false;
  }

  toString() {
    return `${this.isApproximate ? "~" : ""}${this.num}`;
  }
}
