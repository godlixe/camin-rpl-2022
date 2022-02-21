const item = require("../models/item");
const Item = require("../models/item");

const getAllItems = async (req, res) => {
  try {
    const item = await Item.find();
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, msg: error });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, msg: error });
  }
};

const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).send({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, msg: error });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, author } = req.body;

    const item = await Item.findByIdAndUpdate(
      id,
      {
        name,
        description,
        author,
      },
      {
        new: true,
        runValidators: true,
        overwrite: true,
      }
    );
    if (!item) {
      return res
        .status(404)
        .json({ success: false, msg: `No item with id: ${id}` });
    }
    return res.status(200).send({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, msg: error });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, msg: `No item with id: ${id}` });
    }
    return res.status(200).json({
      success: true,
      msg: `Item with id : ${req.body.id} has been deleted`,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: error });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
