import { SmartBuffer } from "smart-buffer";
import { EventReportMessage } from "./event_report_message.js";
import { MessageHeader } from "./message_header.js";
import { MessageTypes } from "./message_types.js";
import { OptionsHeader } from "./options_header.js";
import { NullMessage } from "./null_message.js";
import { AckMessage } from "./ack_message.js";

export class Message {
  constructor(buffer) {
    const reader = SmartBuffer.fromBuffer(buffer);
    this.optionsHeader = new OptionsHeader(reader);
    this.header = new MessageHeader(reader);
    switch (this.header.messageType) {
      case MessageTypes.Null:
        this.body = new NullMessage(reader);
        break;
      case MessageTypes.Ack:
        this.body = new AckMessage(reader);
        break;
      case MessageTypes.EventReport:
        this.body = new EventReportMessage(reader);
        break;
      default:
        break;
    }
  }
}
