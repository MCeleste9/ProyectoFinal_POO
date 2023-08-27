const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

const usuarios = require('./data/usuarios.json');
const pedidos = require('./data/pedidos.json');
const clientes = require('./data/motoristas.json');

app.use(express.json());
app.use(cors());

// Endpoint para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// Endpoint para el inicio de sesión
app.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;
  console.log(req.body);
  const usuarioEncontrado = usuarios.find(user => user.nombre === usuario && user.contrasena === contrasena);
  if (usuarioEncontrado) {
    let u = {...usuarioEncontrado};
    delete u.contrasena;
    delete u.conversaciones;
    res.json({ exito: true, mensaje: 'Inicio de sesión exitoso', usuario: u });
  } else {
    res.status(401).json({ exito: false, mensaje: 'Credenciales inválidas' });
  }
});

// Endpoint para Registro
app.post('/registro', (req, res) => {
    const { nombre, usuario, email, contrasena } = req.body;
    console.log(req.body);
    const nombreEncontrado = usuarios.find(user => user.nombre === nombre && user.usuario === usuario && user.email === email && user.contrasena === contrasena);
    if (nombreEncontrado) {
      let u = {...nombreEncontrado};
      delete u.nombre;
      delete u.usuario;
      delete u.email;
      delete u.contrasena;
      res.json({ exito: true, mensaje: 'Registro exitoso', nombre: u });
    } else {
        if (usuarioExistente) {
      res.status(401).json({ exito: false, mensaje: 'El nombre de usuario ya está en uso' });
    return;
    }
}
    // Crear un nuevo usuario
  const nuevoUsuario = {
    nombre,
    usuario,
    email,
    contrasena,
  };
  
  usuarios.push(nuevoUsuario);
  
  res.json({ exito: true, mensaje: 'Registro exitoso', usuario: nuevoUsuario });
  });

app.listen(3000, () => {
  console.log('Servidor en funcionamiento en el puerto 3000');
});

// Endpoint para el inicio de sesión motorista
app.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;
    console.log(req.body);
    const bikerEncontrado = usuarios.find(user => user.codigo === codigo && user.nombre === usuario && user.contrasena === contrasena);
    if (bikerEncontrado) {
      let u = {...bikerEncontrado};
      delete u.contrasena;
      res.json({ exito: true, mensaje: 'Inicio de sesión exitoso', usuario: u });
    } else {
      res.status(401).json({ exito: false, mensaje: 'Credenciales inválidas' });
    }
  });
  
  // Endpoint para Registro de motorista
  app.post('/registro', (req, res) => {
      const { usuario, codigo, email, contrasena } = req.body;
      console.log(req.body);
      const codigoEncontrado = usuarios.find(user => user.usuario === usuario && user.codigo === codigo && user.email === email && user.contrasena === contrasena);
      if (codigoEncontrado) {
        let u = {...nombreEncontrado};
        delete u.usuario;
        delete u.codigo;
        delete u.email;
        delete u.contrasena;
        res.json({ exito: true, mensaje: 'Registro exitoso', codigo: u });
      } else {
          if (usuarioExistente) {
        res.status(401).json({ exito: false, mensaje: 'El nombre de usuario ya está en uso' });
      return;
      }
  }
      // Crear un nuevo usuario
    const nuevoUsuario = {
      usuario,
      codigo,
      email,
      contrasena,
    };
    
    usuarios.push(nuevoUsuario);
    
    res.json({ exito: true, mensaje: 'Registro exitoso', usuario: nuevoUsuario });
    });


// Endpoint para obtener un usuario específico
app.get('/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  console.log(userId);
  const usuario = usuarios.find(user => user.id === userId);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Endpoint para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  // Asigna un ID único al usuario
  nuevoUsuario.id = usuarios.length + 1;
  usuarios.push(nuevoUsuario);
  res.json(nuevoUsuario);
});

// Endpoint para enviar un pedido
app.post('/pedido', (req, res) => {
  const nuevoPedido = req.body;
  // Determina si es un pedido o varios 
  if (nuevoPedido.idPedidos) {
    const pedido = pedidos.find(pedido => pedido.id === nuevoPedido.idPedidos);
    if (pedido) {
      delete nuevoPedido.idPedidos;
      pedido.mensajes.push(nuevoPedido);
      res.json(nuevoPedido);
    } else {
      res.status(404).json({ error: 'pedido no encontrado' });
    }
  } else {
    const orden = ordenes.find(orden => orden.id === nuevoPedido.idorden);
    if (orden) {
      delete nuevoPedido.idorden;
      orden.mensajes.push(nuevoPedido);
      res.json(nuevoPedido);
    } else {
      res.status(404).json({ error: 'Orden no encontrada' });
    }
  }
});

// Endpoint para obtener las ordenes específicas
app.get('/orden/:id/pedidos', (req, res) => {
  const ordenId = parseInt(req.params.id);
  const orden = ordenes.find(conv => conv.id === ordenId);
  if (orden) {
    res.json(orden.mensajes);
  } else {
    res.status(404).json({ error: 'Orden no encontrada' });
  }
});

// Endpoint para obtener los clientes
app.get('/ordenes/:id/clientes', (req, res) => {
  const ordenesId = parseInt(req.params.id);
  const ordenes = ordeness.find(ordenes => ordenes.id === ordenesId);
  if (ordenes) {
    const clientes = ordenes.clientes.map(cliente => {
      const usuario = usuarios.find(user => user.id === cliente.id);
      return {
        id: usuario.id,
        nombre: usuario.nombre,
      };
    });
    res.json(clientes);
  } else {
    res.status(404).json({ error: 'Ordenes no encontradas' });
  }
});

// function llamarUsuarios(){
//   fetch('http://127.0.0.1:5500/frontend/index.html')
//   .then((response)=>response.json())
//   .then(usuarios => console.log(usuarios))
// }

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});

// llamarUsuarios();