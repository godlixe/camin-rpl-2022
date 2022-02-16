const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.route('/')
  .get(itemController.getAllItems)
  .post(itemController.createItem)
  .put(itemController.updateItem)
  .delete(itemController.deleteItem);

router.get("/:id", itemController.getItemById);

module.exports = router;
