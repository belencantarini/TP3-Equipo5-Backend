// Middleware para proteger rutas: solo usuarios logueados
function protegerRuta(req, res, next) {
  if (!req.session.usuario) {
    if (req.accepts('html')) {
      return res.redirect('/login');
    } else {
        return res.status(401).json({ 
        error: "Acceso no autorizado", 
        mensaje: "Debes iniciar sesión para acceder a este recurso." 
    });
    }
  }
  next();
}

// Middleware para permitir solo ciertos roles
function requiereRol(...rolesPermitidos) {
  return function (req, res, next) {
    if (!req.session.usuario) {
      return res.redirect('/login');
    }

    const rolUsuario = req.session.usuario.rol;

    if (!rolesPermitidos.includes(rolUsuario)) {
      if (req.accepts('html')) {
        return res.status(403).render('403', {
          titulo: "Acceso denegado",
          mensaje: "No tenés permisos para ingresar a esta sección."
        });
      } else {
        return res.status(403).json({
          error: "Acceso denegado",
          mensaje: "El rol del usuario no tiene permisos para esta sección."
        });
      }
    }

    next();
  };
}

module.exports = {
  protegerRuta,
  requiereRol
};
