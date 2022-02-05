const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      fs.readFile("./pages/index/index.html", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    } else if (req.url === "/contact") {
      fs.readFile("./pages/contact/index.html", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    } else {
      fs.readFile("./pages" + req.url, (err, data) => {
        res.setHeader("Content-Type", "text/css");
        console.log(req.method);
        console.log(err);
        res.end(data);
      });
    }
  } else {
    let inputData = "\n";
    req.on("data", (data) => {
      inputData += data;
    });
    req.on("end", () => {
        fs.writeFile("contacts.txt", inputData, {flag: "a"}, (e) => {
            console.log(e);
        });
    });
  }
});

server.listen(5000);
