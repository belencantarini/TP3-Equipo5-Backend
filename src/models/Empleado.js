const Persona = require('./Persona')

class Empleado extends Persona {
    constructor(nombre, apellido, dni, email, rol, area) {
        super(nombre, apellido, dni, email)
        this.rol = rol
        this.area = area
    }
}

module.exports = Empleado
