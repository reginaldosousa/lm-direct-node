export class NetworkTechnology {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

export class NetworkTechnologies {
  static GSM = new NetworkTechnology("GSM", "00");
  static UMTS = new NetworkTechnology("UMTS", "01");
  static LTE = new NetworkTechnology("LTE", 10);
  static Reserved = new NetworkTechnology("Reserved", 11);

  static fromCode(code) {
    return (
      Object.values(NetworkTechnologies).find((type) => type.code === code) ||
      new NetworkTechnology("Unknown", 404)
    );
  }
}

export class EventReportMessage {
  constructor(reader) {
    this.updateTime = new Date(reader.readUInt32BE() * 1000);
    this.timeOfFix = new Date(reader.readUInt32BE() * 1000);
    this.latitude = reader.readInt32BE() / 10_000_000;
    this.longitude = reader.readInt32BE() / 10_000_000;
    this.altitude = reader.readUInt32BE();
    this.speed = reader.readUInt32BE() * 0.036;
    this.heading = reader.readUInt16BE();
    this.satellites = reader.readUInt8();
    this.fixStatus = reader.readUInt8();
    this.carrier = reader.readUInt16BE();
    this.rssi = reader.readInt16BE();

    const commStateByte = reader
      .readUInt8()
      .toString(2)
      .padEnd(8, "0")
      .split("")
      .map(Number);
    this.parseCommState(commStateByte);

    this.hdop = reader.readInt8();

    const inputsByte = reader
      .readInt8()
      .toString()
      .padEnd(8, "0")
      .split("")
      .map(Number);

    this.parseInputs(inputsByte);

    const unitStatusByte = reader
      .readUInt8()
      .toString(2)
      .padStart(8, "0")
      .split("")
      .map((v) => (v === "0" ? "OK" : "ERROR"));

    this.parseUnitStatus(unitStatusByte);

    this.eventIndex = reader.readUInt8();
    this.eventCode = reader.readUInt8();

    const accumulatorsCount = reader.readUInt8();
    const spare = reader.readUInt8();
    this.parseAccumulators(reader, accumulatorsCount);
  }

  parseCommState(commStateByte) {
    this.commState = {
      available: !!commStateByte[0],
      networkService: !!commStateByte[1],
      dataService: !!commStateByte[2],
      connectedPPPSessionUp: !!commStateByte[3],
      voiceCallActive: !!commStateByte[4],
      roaming: !!commStateByte[5],
      networkTechnology: NetworkTechnologies.fromCode(
        `${commStateByte[6]}${commStateByte[7]}`
      ),
    };
  }

  parseInputs(inputsByte) {
    this.inputs = {
      0: !!inputsByte[0],
      1: !!inputsByte[1],
      2: !!inputsByte[2],
      3: !!inputsByte[3],
      4: !!inputsByte[4],
      5: !!inputsByte[5],
      6: !!inputsByte[6],
      7: !!inputsByte[7],
    };
  }

  parseUnitStatus(unitStatusByte) {
    this.unitStatus = {
      OTA_UPDATE_STATUS: unitStatusByte[0],
      GPS_ANTENNA_STATUS: unitStatusByte[1],
      GPS_RECEIVER_SELF_TEST: unitStatusByte[2],
      GPS_RECEIVER_TRACKING: unitStatusByte[3],
    };
  }

  parseAccumulators(reader, accumulatorsCount) {
    this.accumulators = [];
    this.accumulators = [];
    for (let i = 0; i < accumulatorsCount; i++) {
      this.accumulators[i] = reader.readUInt32BE();
    }
  }
}
