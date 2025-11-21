const Paciente = require('../models/pacienteMongoModel');
const Empleado = require('../models/empleadoMongoModel');
const Tarea = require('../models/TareaMongo');
const Insumo = require('../models/insumoMongoModel');

async function mostrarDashboard(req, res) {
  try {

    const totalPacientes = await Paciente.countDocuments();
    const totalEmpleados = await Empleado.countDocuments();
    const totalTareasActivas = await Tarea.countDocuments({ estado: "activo" });
    const totalInsumos = await Insumo.countDocuments();

    res.render('dashboard', {
      titulo: "Panel principal",
      usuario: req.session.usuario,
      totalPacientes,
      totalEmpleados,
      totalTareasActivas,
      totalInsumos
    });

  } catch (error) {
    console.log("❌ Error cargando dashboard:", error);
    res.status(500).send("Error al cargar el dashboard");
  }
}

module.exports = { mostrarDashboard };
