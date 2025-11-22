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
      if (req.accepts('html')) {
        return res.render('login', { error: "Empleado no encontrado" })
        } else {
          return res.status(401).json({ error: "Empleado no encontrado" });
        }
    }

    const coincide = await bcrypt.compare(password, empleado.password);

    if (!coincide) {
      if (req.accepts('html')) {
        return res.render('login', { error: "Contraseña incorrecta" });
      } else {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }
    }

  
    req.session.usuario = {
      id: empleado._id,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      rol: empleado.rol
    };

    if (req.accepts('html')) {
      return res.redirect('/');
    } else {
      return res.status(200).json({ 
        message: "Login exitoso",
        usuario: req.session.usuario
      });
    }

  } catch (error) {
    console.error("Error en login:", error);
    if (req.accepts('html')) {
      return res.render('login', { error: "Error en el login" });
    } else {
      return res.status(500).json({ error: "Error en el login" });
    }
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    if (req.accepts('html')) {
      return res.redirect('/login');
    } else {
      return res.status(200).json({ message: "Logout exitoso" });
    }
  });
}

module.exports = {
  mostrarLogin,
  login,
  logout
};
