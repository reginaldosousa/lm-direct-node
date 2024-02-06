class MobileIdType {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}
class MobileIdTypes {
  static OFF = new MobileIdType("OFF", 0);
  static ESN = new MobileIdType("ESN", 1);
  static IMEI = new MobileIdType("IMEI", 2);
  static IMSI = new MobileIdType("IMSI", 3);
  static USER_DEFINED = new MobileIdType("USER_DEFINED", 4);
  static PHONE_NUMBER = new MobileIdType("PHONE_NUMBER", 5);
  static IP_ADDRESS = new MobileIdType("IP_ADDRESS", 6);

  static fromCode(code) {
    return (
      Object.values(MobileIdTypes).find((type) => type.code === code) ||
      new MobileIdType("Unknown", 404)
    );
  }
}

export class OptionsHeader {
  options = {};
  constructor(reader) {
    const optionsByte = reader.readUInt8();
    this.parseOptions(optionsByte);
    this.parseHeader(reader);
  }

  parseOptions(optionsByte) {
    this.options = {
      mobileID: optionsByte & 0b00000001,
      mobileIdType: optionsByte & 0b00000010,
      authentication: optionsByte & 0b00001000,
      routing: optionsByte & 0b00010000,
      forward: optionsByte & 0b00100000,
      redirection: optionsByte & 0b01000000,
    };
  }

  parseHeader(reader) {
    if (this.options.mobileID) {
      this.mobileID = reader.readString(reader.readUInt8(), "hex");
    }
    if (this.options.mobileIdType) {
      const code = reader.readString(reader.readUInt8(), "hex");
      this.mobileIDType = MobileIdTypes.fromCode(parseInt(code));
    }
    this.authentication = this.options.authentication
      ? reader.readString(reader.readUInt8(), "hex")
      : "";
    this.routing = this.options.routing
      ? reader.readString(reader.readUInt8(), "hex")
      : "";
    this.forward = this.options.forward
      ? reader.readString(reader.readUInt8(), "hex")
      : "";
  }
}
