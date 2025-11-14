function validarPaciente(req, res, next) {
    const { nombre, apellido, dni, email } = req.body;

    if (!nombre || !apellido || !dni) {
        return res.status(400).json({ error: "nombre, apellido y dni son obligatorios" });
    }

    if (!/^\d{7,8}$/.test(String(dni))) {
        return res.status(400).json({ error: "dni inválido (debe tener 7 u 8 dígitos numéricos)" });
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: "email inválido" });
    }

    next();
}

module.exports = { validarPaciente };
