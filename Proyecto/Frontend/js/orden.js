const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ type: String, required: true }],
  total: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
