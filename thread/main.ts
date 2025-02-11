import { spawn } from "child_process";
import { createReadStream } from "fs";

const child = spawn("ls");

child.stdout.on("data", (data) => {
  console.log(data.toString());
});

const readableStream = createReadStream("./file.txt");
const wc = spawn("wc", ["-c"]);

readableStream.pipe(wc.stdin);

wc.stdout.on("data", (data) => {
  console.log(`Number of characters: ${data}`);
});
