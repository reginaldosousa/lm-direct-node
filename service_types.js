export class ServiceType {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

export class ServiceTypes {
  static UnacknowledgedRequest = new ServiceType("UnacknowledgedRequest", 0);
  static AcknowledgedRequest = new ServiceType("AcknowledgedRequest", 1);
  static ResponseToAnAcknowledgedRequest = new ServiceType(
    "ResponseToAnAcknowledgedRequest",
    2
  );

  static fromCode(code) {
    return (
      Object.values(ServiceTypes).find((type) => type.code === code) ||
      new ServiceType("Unknown", 404)
    );
  }
}
