const mongoose = require("mongoose")

const sweetSchema = new mongoose.Schema({
    name: { type: String, required: true, "Please enter name of sweet"},
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
})