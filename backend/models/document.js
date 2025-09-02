const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  _id: {
    type: String, // use string instead of ObjectId
    required: true,
  },
  data: {
    type: Object,
    default: {},
  },
});

module.exports = mongoose.model("Document", DocumentSchema);
