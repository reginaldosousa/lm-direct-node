import { SmartBuffer } from "smart-buffer";
import { AckMessage } from "./ack_message.js";

describe("AckMessage", () => {
  let ackMessage;

  beforeAll(() => {
    const raw = "020000363067";
    const buffer = SmartBuffer.fromBuffer(Buffer.from(raw, "hex"));
    ackMessage = new AckMessage(buffer);
  });

  it("deve ter o tipo de mensagem correto", () => {
    expect(ackMessage.messageType).toEqual({ name: "EventReport", code: 2 });
  });

  it("deve ter o tipo de ACK correto", () => {
    expect(ackMessage.ackType).toEqual({
      name: "ACK - Operation successful",
      code: 0,
    });
  });

  it("deve ter a versão do aplicativo correta", () => {
    expect(ackMessage.appVersion).toBe("60g");
  });
});
