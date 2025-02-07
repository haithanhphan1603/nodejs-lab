import { createServer, IncomingMessage, ServerResponse } from "http";
import * as multiparty from "multiparty";
import { Stream } from "stream";
import { promisify } from "util";
import * as fs from "fs";

const port = 5001;

interface Post {
  title: string;
  content: string;
}

const posts: Post[] = [
  {
    title: "Love Phan Linh",
    content: "dolor it era",
  },
];

const server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    switch (request.url) {
      case "/posts":
        if (request.method === "GET") {
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify(posts));
        } else if (request.method === "POST") {
          getJSONDataFromRequestStream<Post>(request).then((post) => {
            posts.push(post);
            response.end(JSON.stringify(posts));
          });
        }
        break;
      case "/upload":
        if (request.method === "POST") {
          parseTheForm(request);
        }
        break;
      default:
        response.statusCode = 404;
        response.end();
    }
  }
);

function getJSONDataFromRequestStream<T>(request: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    const chunks: any = [];
    request.on("data", (chunk) => {
      chunks.push(chunk);
    });
    request.on("end", () => {
      resolve(JSON.parse(Buffer.concat(chunks).toString()));
    });
  });
}

const writeFile = promisify(fs.writeFile);

function handleWriting(fields: Map, photoBuffer: Buffer, filename: string) {
  writeFile(
    `files/${fields.get("firstName")}-${fields.get("lastName")}-${filename}`,
    photoBuffer
  ).then(() => {});
}

function getDataFromStream(stream: Stream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any = [];
    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    stream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
  });
}

function parseTheForm(request: IncomingMessage) {
  const form = new multiparty.Form();
  form.parse(request);

  const fields = new Map();
  let photoBuffer: Buffer;
  let filename: string;

  form.on("part", async function (part: multiparty.Part) {
    if (!part.filename) {
      await handleFieldPart(part, fields);
      part.resume();
    }
    if (part.filename) {
      filename = part.filename;
      photoBuffer = await getDataFromStream(part);
    }
  });

  form.on("close", () => handleWriting(fields, photoBuffer, filename));
}

async function handleFieldPart(part: multiparty.Part, fields: Map) {
  return getDataFromStream(part).then((value) => {
    fields.set(part.name, value.toString());
  });
}

server.listen(port, () => {
  console.log(`sever is running on ${port}`);
});
