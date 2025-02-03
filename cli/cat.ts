import { promisify } from "util";
import * as fs from "fs";

const readFile = promisify(fs.readFile);

export default function cat(path: string) {
  readFile(path, { encoding: "utf-8" })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
}
