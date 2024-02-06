import { describe, it, expect } from "@jest/globals";
import { Message } from "./message.js";
import { NullMessage } from "./null_message.js";

describe("Message", () => {
  it("must set null message body when message type is 0", () => {
    const raw = "83050102030405010100000001";
    const buffer = Buffer.from(raw, "hex");
    const message = new Message(buffer);
    expect(message.body).toBeInstanceOf(NullMessage);
  });
});
