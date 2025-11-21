const Empleado = require('../models/empleadoMongoModel');
const bcrypt = require('bcrypt');

async function mostrarLogin(req, res) {
  res.render('login', { titulo: "Login" });
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const empleado = await Empleado.findOne({ email });

    if (!empleado) {
      return res.render('login', { error: "Empleado no encontrado" });
    }

    const coincide = await bcrypt.compare(password, empleado.password);

    if (!coincide) {
      return res.render('login', { error: "Contraseña incorrecta" });
    }

  
    req.session.usuario = {
      id: empleado._id,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      rol: empleado.rol
    };

    res.redirect('/');
  } catch (error) {
    res.render('login', { error: "Error en el login" });
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

module.exports = {
  mostrarLogin,
  login,
  logout
};
