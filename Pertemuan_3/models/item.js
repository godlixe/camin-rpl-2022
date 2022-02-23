const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name belum diisi"]
    },
    description: {
        type: String,
        required: [true, "description belum diisi"]
    },
    author: {
        type: String,
        required: [true, "author belum diisi"]
    }
})

module.exports = mongoose.model('item', itemSchema);