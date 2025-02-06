import { createServer, IncomingMessage, ServerResponse } from "http";

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

server.listen(port, () => {
  console.log(`sever is running on ${port}`);
});
