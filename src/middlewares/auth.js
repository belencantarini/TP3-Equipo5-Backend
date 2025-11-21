// Middleware para proteger rutas: solo usuarios logueados
function protegerRuta(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/login');
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
      return res.status(403).render('403', {
        titulo: "Acceso denegado",
        mensaje: "No tenés permisos para ingresar a esta sección."
      });
    }

    next();
  };
}

module.exports = {
  protegerRuta,
  requiereRol
};
