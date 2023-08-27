const express = require('express');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ type: String, required: true }],
  total: { type: Number, required: true },
  // Otros campos relacionados con los pedidos
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

const app = express();
const PORT = 3000;

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/delivery_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

// Configuración de rutas, middlewares, etc.

app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});

const Orden = require('./orden'); 

app.post('/api/orders', async (req, res) => {
  try {
    const { items, total } = req.body;
    const order = new Order({ items, total });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
});

// ... (otras rutas y middlewares)

app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
