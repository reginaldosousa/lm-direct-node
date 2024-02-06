import { describe, expect, it, jest } from "@jest/globals";
import { OptionsHeader } from "./options_header";
import { SmartBuffer } from "smart-buffer";

const raw =
  "8305467552358101010102709865ba3e7665ba3e76ee0ddceae174179400000bf40000012e007410000005ffbb0f063f04322c10000000338900000fec00000000013d34170000ae6200000000000000000113d45701169d9a00000000000000000000000000000000000000510000000000000000";
const buffer = Buffer.from(raw, "hex");
const optionsHeader = new OptionsHeader(SmartBuffer.fromBuffer(buffer));

describe("OptionsHeader", () => {
  it("should parse options", () => {
    expect(optionsHeader.options).toEqual({
      mobileID: 1,
      mobileIdType: 2,
      authentication: 0,
      routing: 0,
      forward: 0,
      redirection: 0,
    });
  });
  it("should parse mobileID", () => {
    expect(optionsHeader.mobileID).toEqual("4675523581");
  });
  it("should parse mobileIdType", () => {
    expect(optionsHeader.mobileIDType).toEqual({
      name: "ESN",
      code: 1,
    });
  });
  it("should parse authentication", () => {
    expect(optionsHeader.authentication).toEqual("");
  });
  it("should parse routing", () => {
    expect(optionsHeader.routing).toEqual("");
  });
  it("should parse forward", () => {
    expect(optionsHeader.forward).toEqual("");
  });
});
