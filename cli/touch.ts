import { promisify } from "util";
import * as fs from "fs";

const writeFile = promisify(fs.writeFile);

export default function touch(path: string) {
  writeFile(path, "")
    .then(() => {
      console.log("File created");
    })
    .catch((err) => {
      console.error(err);
    });
}
