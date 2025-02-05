import * as fs from "fs";
import * as util from "util";
import { StringDecoder } from "string_decoder";

const readFile = util.promisify(fs.readFile);

readFile("./test.txt", { encoding: "utf-8" })
  .then((content) => {
    console.log(content);
  })
  .catch((error) => console.log(error));

const decoder = new StringDecoder("utf-8");

const buffers = [
  Buffer.from("Hello "),
  Buffer.from([0b11110000, 0b10011111]),
  Buffer.from([0b10001100, 0b10001110]),
  Buffer.from(" world!"),
];

const result = buffers.reduce(
  (result, buffer) => `${result}${decoder.write(buffer)}`,
  ""
);

console.log(result); // Hello 🌎 world!
