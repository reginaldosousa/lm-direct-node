import { MessageTypes } from "./message_types.js";
import { ServiceTypes } from "./service_types.js";

export class MessageHeader {
  constructor(reader) {
    this.serviceType = ServiceTypes.fromCode(reader.readUInt8());
    this.messageType = MessageTypes.fromCode(reader.readUInt8());
    this.sequenceNumber = reader.readUInt16BE();
  }
}
