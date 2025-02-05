// import * as fs from "fs";
import { Writable } from "stream";
import * as fs from "fs";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);

class WriteableStream extends Writable {
  path: string;

  constructor(path: string) {
    super();
    this.path = path;
  }

  _write(
    chunk: any,
    encoding: BufferEncoding,
    next: (error?: Error | null) => void
  ): void {
    writeFile(this.path, chunk, encoding)
      .then(() => {
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
}

const readable = fs.createReadStream("./file.txt");
const writable = new WriteableStream("./file2.txt");

readable.pipe(writable);
