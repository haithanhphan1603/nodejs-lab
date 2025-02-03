import * as fs from "fs";
import * as util from "util";

const unlink = util.promisify(fs.unlink);

export default function rm(path: string) {
  unlink(path)
    .then(() => {
      console.log("delete file successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
