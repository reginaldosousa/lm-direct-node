import { MessageTypes } from "./message_types.js";

class AckType {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

class AckTypes {
  static Ack = new AckType("ACK - Operation successful", 0);
  static NO_REASON = new AckType("NACK - Operation Failed, no reason", 1);
  static NOT_A_SUPPORTED_MESSAGE = new AckType(
    "NACK - Operation Failed, not a supported message type",
    2
  );
  static NOT_A_SUPPORTED_OPERATION = new AckType(
    "NACK - Operation Failed, not a supported operation",
    3
  );
  static UNABLE_TO_PASS_SERIAL_PORT = new AckType(
    "NACK - Operation Failed, unable to pass to serial port",
    4
  );
  static AUTHENTICATION_FAILURE = new AckType(
    "NACK - Operation Failed, authentication failure",
    5
  );
  static MOBILE_ID_LOOKUP_FAILURE = new AckType(
    "NACK - Operation Failed, Mobile ID look-up failure",
    6
  );
  static SAME_SEQUENCE_NUMBER = new AckType(
    "NACK - Operation Failed, non-zero sequence number same as last received message",
    7
  );

  static fromCode(code) {
    return (
      Object.values(AckTypes).find((type) => type.code === code) ||
      new AckType("Unknown", 404)
    );
  }
}

export class AckMessage {
  constructor(reader) {
    this.messageType = MessageTypes.fromCode(reader.readUInt8());
    this.ackType = AckTypes.fromCode(reader.readUInt8());
    const _spare = reader.readUInt8();
    this.appVersion = reader.readString(3, "utf8");
  }
}
