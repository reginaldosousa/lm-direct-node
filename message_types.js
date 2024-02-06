export class MessageType {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

export class MessageTypes {
  static Null = new MessageType("Null", 0);
  static Ack = new MessageType("ACK/NAK", 1);
  static EventReport = new MessageType("EventReport", 2);
  static IDReport = new MessageType("IDReport", 3);
  static UserData = new MessageType("UserData", 4);
  static ApplicationData = new MessageType("ApplicationData", 5);
  static ConfigurationParameter = new MessageType("ConfigurationParameter", 6);
  static UnitRequest = new MessageType("UnitRequest", 7);
  static LocateReport = new MessageType("LocateReport", 8);
  static UserDataWithAccumulators = new MessageType(
    "UserDataWithAccumulators",
    9
  );
  static MiniEventReport = new MessageType("MiniEventReport", 10);
  static MiniUser = new MessageType("MiniUser", 11);

  static fromCode(code) {
    return (
      Object.values(MessageTypes).find((type) => type.code === code) ||
      new MessageType("Unknown", 404)
    );
  }
}
