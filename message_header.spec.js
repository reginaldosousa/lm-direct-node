import { describe, it, expect, jest } from "@jest/globals";
import {
  MessageHeader,
  MessageTypes,
  ServiceTypes,
  MessageType,
  ServiceType,
} from "./message_header";

describe("MessageHeader", () => {
  it("must correctly create a message header with the service and message types", () => {
    // Mock para reader
    const mockReader = {
      readUInt8: jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(1), // Simula ServiceType 0 e MessageType 1
      readUInt16BE: jest.fn().mockReturnValue(123), // Simula um número de sequência
    };

    const header = new MessageHeader(mockReader);

    expect(header.serviceType).toEqual(ServiceTypes.UnacknowledgedRequest);
    expect(header.messageType).toEqual(MessageTypes.Ack);
    expect(header.sequenceNumber).toBe(123);
  });
});

describe("ServiceTypes", () => {
  it("must return the correct service type based on the code", () => {
    expect(ServiceTypes.fromCode(0)).toEqual(
      ServiceTypes.UnacknowledgedRequest
    );
    expect(ServiceTypes.fromCode(1)).toEqual(ServiceTypes.AcknowledgedRequest);
    expect(ServiceTypes.fromCode(2)).toEqual(
      ServiceTypes.ResponseToAnAcknowledgedRequest
    );
  });

  it("must return an unknown service type for invalid codes", () => {
    const unknownServiceType = ServiceTypes.fromCode(999);
    expect(unknownServiceType).toEqual(expect.any(ServiceType));
    expect(unknownServiceType.name).toBe("Unknown");
    expect(unknownServiceType.code).toBe(404);
  });
});

describe("MessageTypes", () => {
  it("must return the correct message type based on the code", () => {
    expect(MessageTypes.fromCode(0)).toEqual(MessageTypes.Null);
    expect(MessageTypes.fromCode(1)).toEqual(MessageTypes.Ack);
    expect(MessageTypes.fromCode(2)).toEqual(MessageTypes.EventReport);
    expect(MessageTypes.fromCode(3)).toEqual(MessageTypes.IDReport);
    expect(MessageTypes.fromCode(4)).toEqual(MessageTypes.UserData);
    expect(MessageTypes.fromCode(5)).toEqual(MessageTypes.ApplicationData);
    expect(MessageTypes.fromCode(6)).toEqual(
      MessageTypes.ConfigurationParameter
    );
    expect(MessageTypes.fromCode(7)).toEqual(MessageTypes.UnitRequest);
    expect(MessageTypes.fromCode(8)).toEqual(MessageTypes.LocateReport);
    expect(MessageTypes.fromCode(9)).toEqual(
      MessageTypes.UserDataWithAccumulators
    );
  });

  it("must return an unknown message type for invalid codes", () => {
    const unknownMessageType = MessageTypes.fromCode(999);
    expect(unknownMessageType).toEqual(expect.any(MessageType));
    expect(unknownMessageType.name).toBe("Unknown");
    expect(unknownMessageType.code).toBe(404);
  });
});
