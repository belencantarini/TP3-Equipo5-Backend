function validarPaciente(req, res, next) {
    const { nombre, apellido, dni, telefono, email } = req.body;

    let error = "";
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;

    if (!soloLetras.test(nombre)) error = "El nombre solo puede contener letras";
    else if (!soloLetras.test(apellido)) error = "El apellido solo puede contener letras";
    else if (!/^\d{7,8}$/.test(String(dni))) error = "El DNI debe tener 7 u 8 dígitos numéricos";
    else if (telefono && !/^\d+$/.test(String(telefono))) error = "El teléfono solo puede contener números";
    else if (email && !/^\S+@\S+\.\S+$/.test(email)) error = "El email ingresado no es válido";

    if (error) {
        const vista = req.originalUrl.includes("editar") ? "pacientes_editar" : "pacientes_nuevo";
        const paciente = { ...req.body, _id: req.params.id };

        return res.render(`pacientes/${vista}`, {
            titulo: vista === "pacientes_nuevo" ? "Nuevo Paciente" : "Editar Paciente",
            error,
            paciente
        });
    }

    next();
}

module.exports = { validarPaciente };


