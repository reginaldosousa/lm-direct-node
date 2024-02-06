import { describe, it, jest, expect, beforeEach } from "@jest/globals";
import { EventReportMessage } from "./event_report_message";
import { SmartBuffer } from "smart-buffer";

describe("EventReportMessage", () => {
  let message;
  beforeEach(() => {
    const raw =
      "65ba3e7665ba3e76ee0ddceae174179400000bf40000012e007410000005ffbb0f063f04322c10000000338900000fec00000000013d34170000ae6200000000000000000113d45701169d9a00000000000000000000000000000000000000510000000000000000";
    const buffer = Buffer.from(raw, "hex");
    const reader = SmartBuffer.fromBuffer(buffer);
    message = new EventReportMessage(reader);
  });

  it("must have a correct update date and time", () => {
    expect(message.updateTime).toEqual(new Date("2024-01-31T12:35:02.000Z"));
  });

  it("must have a correct date and time of fix", () => {
    expect(message.timeOfFix).toEqual(new Date("2024-01-31T12:35:02.000Z"));
  });

  it("must have the correct latitude and longitude", () => {
    expect(message.latitude).toBe(-30.1081366);
    expect(message.longitude).toBe(-51.2485484);
  });

  it("must have the correct altitude, speed and direction", () => {
    expect(message.altitude).toBe(3060);
    expect(message.speed).toBe(10.872);
    expect(message.heading).toBe(116);
  });

  it("must have the correct number of satellites and fix status", () => {
    expect(message.satellites).toBe(16);
    expect(message.fixStatus).toBe(0);
  });

  it("must have the correct communication status information", () => {
    expect(message.commState).toEqual({
      available: true,
      networkService: true,
      dataService: true,
      connectedPPPSessionUp: true,
      voiceCallActive: false,
      roaming: false,
      networkTechnology: { name: "GSM", code: "00" },
    });
  });

  it("must have the correct input status", () => {
    expect(message.inputs).toEqual({
      0: true,
      1: true,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
    });
  });

  it("must have correct unit status", () => {
    expect(message.unitStatus).toEqual({
      OTA_UPDATE_STATUS: "OK",
      GPS_ANTENNA_STATUS: "OK",
      GPS_RECEIVER_SELF_TEST: "OK",
      GPS_RECEIVER_TRACKING: "OK",
    });
  });

  it("must have the correct index and event code", () => {
    expect(message.eventIndex).toBe(50);
    expect(message.eventCode).toBe(44);
  });

  it("must have the correct accumulators", () => {
    expect(message.accumulators).toEqual([
      13193, 4076, 0, 20788247, 44642, 0, 0, 18076759, 18259354, 0, 0, 0, 0, 81,
      0, 0,
    ]);
  });
});
