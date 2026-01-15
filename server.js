// Importar dependencias
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// ===============================
// Simulación de base de datos en memoria
// ===============================
let usuarios = [];

let servicios = [
  { id: 1, nombre: "Manicura tradicional", precio: 25000 },
  { id: 2, nombre: "Pedicure tradicional", precio: 25000 },
  { id: 3, nombre: "Semipermanente manos", precio: 45000 },
  { id: 4, nombre: "Semipermamente pies", precio: 50000 },
  { id: 5, nombre: "Uñas Press On", precio: 90000 },
  { id: 6, nombre: "Cepillados", precio: 18000 },
  { id: 7, nombre: "Repolarización y tratamientos capilares", precio: 35000 },
  { id: 8, nombre: "Aplicación de tinte", precio: 35000 },
  { id: 9, nombre: "Balayage", precio: 250000 },
  { id: 10, nombre: "Iluminaciones y mechas", precio: 150000 },
  { id: 11, nombre: "Keratinas", precio: 100000 },
  { id: 12, nombre: "Cortes", precio: 10000 },
  { id: 13, nombre: "Pigmento de cejas", precio: 25000 },
  { id: 14, nombre: "Pestañas", precio: 35000 }
];

let negocio = {
  nombre: "Spa & Estética Bella",
  direccion: "Calle 123 #45-67, Medellín",
  telefono: "3001234567",
  horario: "Lunes a Sábado 9am - 7pm"
};

let citas = [];

// ===============================
// Endpoints de autenticación
// ===============================

// Registro de usuario
app.post("/register", (req, res) => {
  const { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ mensaje: "Usuario y contraseña son requeridos" });
  }

  usuarios.push({ usuario, contraseña });
  res.json({ mensaje: "Usuario registrado correctamente" });
});

// Login de usuario
app.post("/login", (req, res) => {
  const { usuario, contraseña } = req.body;

  const encontrado = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);

  if (encontrado) {
    res.json({ mensaje: "Autenticación satisfactoria" });
  } else {
    res.status(401).json({ mensaje: "Error en la autenticación" });
  }
});

// ===============================
// Endpoints de negocio y servicios
// ===============================

// Listar servicios
app.get("/servicios", (req, res) => {
  res.json(servicios);
});

// Información del negocio
app.get("/negocio", (req, res) => {
  res.json(negocio);
});

// ===============================
// Endpoints de citas
// ===============================

// Agendar cita
app.post("/citas", (req, res) => {
  const { usuario, servicioId, fecha, hora } = req.body;

  if (!usuario || !servicioId || !fecha || !hora) {
    return res.status(400).json({ mensaje: "Todos los campos son requeridos" });
  }

  const servicio = servicios.find(s => s.id === servicioId);
  if (!servicio) {
    return res.status(404).json({ mensaje: "Servicio no encontrado" });
  }

  const nuevaCita = { id: citas.length + 1, usuario, servicio, fecha, hora };
  citas.push(nuevaCita);

  res.json({ mensaje: "Cita agendada correctamente", cita: nuevaCita });
});

// Consultar citas
app.get("/citas", (req, res) => {
  res.json(citas);
});

// Cancelar cita
app.delete("/citas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  citas = citas.filter(c => c.id !== id);
  res.json({ mensaje: "Cita cancelada correctamente" });
});

// ===============================
// Endpoint raíz
// ===============================
app.get("/", (req, res) => {
  res.send("Servicio web activo. Endpoints: /register, /login, /servicios, /negocio, /citas");
});

// ===============================
// Iniciar servidor
// ===============================
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
