const { leerData } = require('../lib/fs');

async function validarApiPaciente(req, res, next) {
    const { nombre, apellido, dni, telefono, email, obraSocial } = req.body;

    // Verificar campos vacíos
    if (!nombre || !apellido || !dni) {
        return res.status(400).json({
            mensaje: "Nombre, apellido y DNI son obligatorios"
        });
    }

    // Verificar DNI duplicado
    const pacientes = await leerData("pacientes");
    const duplicado = pacientes.some(p => p.dni === dni && p.id !== req.params.id);

    if (duplicado) {
        return res.status(400).json({ mensaje: "DNI ya registrado" });
    }

    next();
}

module.exports = { validarApiPaciente };

