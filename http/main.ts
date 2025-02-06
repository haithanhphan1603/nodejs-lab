import { IncomingHttpHeaders, request, RequestOptions } from "http";

interface Response {
  data: object;
  headers: IncomingHttpHeaders;
}

// Get request
function performRequest(options: RequestOptions) {
  return new Promise((resolve, reject) => {
    request(options, function (response) {
      const { statusCode, headers } = response;
      console.log(statusCode);
      if (statusCode >= 300) {
        reject(new Error(response.statusMessage));
      }
      const chunks: any = [];
      response.on("data", (chunk) => {
        chunks.push(chunk);
      });
      response.on("end", () => {
        const data = Buffer.concat(chunks).toString();
        const result: Response = {
          data: JSON.parse(data),
          headers,
        };
        resolve(result);
      });
    }).end();
  });
}

performRequest({
  host: "jsonplaceholder.typicode.com",
  path: "/todos/1",
  method: "GET",
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
