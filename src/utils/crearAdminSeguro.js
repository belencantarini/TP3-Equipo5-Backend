require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Empleado = require('../models/empleadoMongoModel');

async function crearAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Ver si ya existe
    const existe = await Empleado.findOne({ email: 'admin@clinica.com' });
    if (existe) {
      console.log("⚠ Ya existe un admin, no se crea otro.");
      process.exit();
    }

    // Hash contraseña
    const hashed = await bcrypt.hash("admin123", 10);

    // Crear admin válido
    const nuevo = new Empleado({
      nombre: "Admin",
      apellido: "Principal",
      dni: "11111111",
      telefono: "123456789",
      area: "Administración de Turnos",    
      email: "admin@clinica.com",
      password: hashed,
      rol: "administrador",               
      activo: true
    });

    await nuevo.save();

    console.log("Admin creado con éxito:");
    console.log("- Email: admin@clinica.com");
    console.log("- Password: admin123");

    process.exit();

  } catch (err) {
    console.error("Error creando admin:", err.message);
    process.exit();
  }
}

crearAdmin();
