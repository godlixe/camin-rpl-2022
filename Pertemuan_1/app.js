const http = require("http");
const fs = require("fs");
const path = require("path");

function sendResponseFile(url, req, res) {
  fs.readFile(url, (err, data) => {
    res.setHeader(
      "Content-Type",
      !path.extname(req.url) ? "text/html" : "text/css"
    );
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      sendResponseFile("./pages/index/index.html", req, res);
    } else if (req.url === "/contact") {
      sendResponseFile("./pages/contact/index.html", req, res);
    } else {
      sendResponseFile("./pages" + req.url, req, res);
    }
  } else {
    let inputData = "";
    req.on("data", (data) => {
      inputData += data;
    });
    req.on("end", () => {
      inputData += "\n";
      fs.writeFile("contacts.txt", inputData, { flag: "a" }, (e) => {
        if(e) console.log(e);
      });
    });
    sendResponseFile("./pages/contact/index.html", req, res);
  }
});

server.listen(5000);
