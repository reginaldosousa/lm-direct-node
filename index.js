export { Message } from "./message.js";

import { Message } from "./message.js";

const raw = "83050102030405010102010001000000000000";
const message = new Message(Buffer.from(raw, "hex"));

console.log(message);
