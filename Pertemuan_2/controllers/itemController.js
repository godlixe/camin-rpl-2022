const fs = require("fs");
const express = require("express");

const getData = () => {
  return JSON.parse(fs.readFileSync("./data.json"));
};

const saveData = (data) => {
  db = getData();
  db.push(data);
  fs.writeFileSync("./data.json", JSON.stringify(db));
};

const getAllItems = (req, res) => {
  return res.send(getData());
};

const getItemById = (req, res) => {
  let item = getData().find((o) => o.id == req.body.id);
  return item
    ? res.send(item)
    : res.status(404).send("Data not found in the database...");
};

const createItem = (req, res) => {
  let item = {
    id: getData().length ? getData()[getData().length - 1].id + 1 : 1,
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
  };
  if (item.name == null || item.description == null || item.author == null) {
    return res.send(
      "Data cannot be saved, please make sure to fill the request body!"
    );
  }
  saveData(item);
  res.status(200).send("Item successfully added!");
};

const updateItem = (req, res) => {
  if(!getData().find((o) => o.id == req.body.id)) return res.status(404).send("Data not found in database");

  let db = getData();
  let updates = req.body;
  db.find((o, i, db) => {
    if (o.id == updates.id) {
      db[i] = {
        id: o.id,
        name: updates.name ? updates.name : o.name,
        description: updates.description ? updates.description : o.description,
        author: updates.author ? updates.author : o.author,
      };
      return true;
    }
  });
  fs.writeFileSync("./data.json", JSON.stringify(db));
  res.status(200).send("Item successfully edited!");
};

const deleteItem = (req, res) => {
  let db = getData();
  db = db.filter((o) => {
    return o.id != req.body.id;
  });
  fs.writeFileSync("./data.json", JSON.stringify(db));
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
