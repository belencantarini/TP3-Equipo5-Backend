const { leerData } = require('../lib/fs');

async function validarApiEmpleado(req, res, next) {
    try {
        const { nombre, apellido, dni, email, rol, area } = req.body;

        // Cargar datos de apoyo
        const roles = await leerData('roles');
        const areas = await leerData('areas');
        const empleados = await leerData('empleados');

        // Validaciones básicas
        if (!nombre || !apellido || !dni || !email || !rol || !area) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // DNI duplicado (solo si estamos creando)
        if (req.method === "POST") {
            if (empleados.some(e => e.dni === dni)) {
                return res.status(400).json({ error: "DNI registrado previamente." });
            }
        }

        // DNI duplicado al editar (permitiendo usar el mismo del empleado actual)
        if (req.method === "PUT") {
            const { id } = req.params;
            if (empleados.some(e => e.dni === dni && e.id !== id)) {
                return res.status(400).json({ error: "Otro empleado ya tiene ese DNI." });
            }
        }

        // Rol válido
        if (!roles.includes(rol)) {
            return res.status(400).json({
                error: `Rol inválido. Debe ser uno de: ${roles.join(", ")}`
            });
        }

        // Área válida
        if (!areas.includes(area)) {
            return res.status(400).json({
                error: `Área inválida. Debe ser una de: ${areas.join(", ")}`
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Error interno en validación." });
    }
}

module.exports = { validarApiEmpleado };

