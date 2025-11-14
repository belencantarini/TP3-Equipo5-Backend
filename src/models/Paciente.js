const Persona = require('./Persona');

class Paciente extends Persona {
    constructor(nombre, apellido, dni, email, telefono, obraSocial = null, nroAfiliado = null, fechaNacimiento = null) {
        // hereda de Persona: id, nombre, apellido, dni, email
        super(nombre, apellido, dni, email);

        // extras de Paciente
        this.telefono = telefono;
        this.obraSocial = obraSocial;
        this.nroAfiliado = nroAfiliado;
        this.fechaNacimiento = fechaNacimiento;
    }
}

module.exports = Paciente;
