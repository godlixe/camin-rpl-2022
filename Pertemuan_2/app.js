const express = require("express");
const items = require("./data.json");
const fs = require("fs");
const itemRouter = require("./routes/itemRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/items', itemRouter);

app.get("/", (req, res) => {
  res.json(items);
});

app.listen(5000, () => {
  console.log("Server is running");
});
