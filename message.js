import { SmartBuffer } from "smart-buffer";
import { EventReportMessage } from "./event_report_message.js";
import { MessageHeader, MessageTypes } from "./message_header.js";
import { OptionsHeader } from "./options_header.js";

export class Message {
  constructor(buffer) {
    const reader = SmartBuffer.fromBuffer(buffer);
    this.optionsHeader = new OptionsHeader(reader);
    this.header = new MessageHeader(reader);
    switch (this.header.messageType) {
      case MessageTypes.EventReport:
        this.body = new EventReportMessage(reader);
        break;
      default:
        break;
    }
  }
}
