const { v4: uuidv4 } = require('uuid')

class Tarea {
    constructor({area, tipo, estado, prioridad, fechaInicio, fechaFin, empleadoId,pacienteId,proveedor,observaciones}) {
        this.id = uuidv4()
        this.area = area
        this.tipo = tipo || null;
        this.estado = estado
        this.prioridad = prioridad
        this.fechaInicio = new Date().toISOString(); 
        this.fechaFin = fechaFin || null;
        this.empleadoId = empleadoId || null; 
        this.pacienteId = pacienteId || null; 
        this.proveedor = proveedor || null; 
        this.observaciones = observaciones || null;
    }
}

module.exports = Tarea
