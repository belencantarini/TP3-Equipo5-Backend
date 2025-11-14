const { v4: uuidv4 } = require('uuid')

class Persona {
    constructor(nombre, apellido, dni, email) {
        this.id = uuidv4()
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.email = email
    }
}

module.exports = Persona
