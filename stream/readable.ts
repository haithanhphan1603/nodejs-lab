import * as fs from "fs";
import { Readable } from "stream";

const stream = fs.createReadStream("file.txt", {
  encoding: "utf-8",
});

stream.on("data", (chunk) => {
  console.log(chunk);
});

const readableStream = new Readable();

readableStream.push("Hello");
readableStream.push("World!");
readableStream.push(null);

readableStream.on("data", (chunk) => {
  console.log(chunk.toString());
});

// const stream = fs.createReadStream(`${__dirname}/file.txt`);

// stream.resume();

// cause lost data
// setTimeout(() => {
//   stream.on("data", (data) => {
//     console.log(data);
//   });
// }, 2000);
