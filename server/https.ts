import { createServer } from "https";
import { promisify } from "util";
import * as fs from "fs";

const readFile = promisify(fs.readFile);

async function startServer() {
  const [key, cert] = await Promise.all([
    readFile("key.pem"),
    readFile("certificate.pem"),
  ]);
  const server = createServer(
    {
      key,
      cert,
    },
    (req, res) => {
      res.statusCode = 200;
      res.end("Hi mom");
    }
  );
  server.listen(3000, () => {
    console.log("Server has been started");
  });
}

startServer();
