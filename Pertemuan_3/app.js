const express = require("express");
const itemRouter = require("./routes/itemRoute");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/items', itemRouter);


app.get("/", (req, res) => {
  res.send("Homepage");
});

const start = async () => {
  try{
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("Server started on port 5000"));
  } catch(err){
    console.log(err);
  }
}

start();