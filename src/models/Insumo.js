class Insumo {
  constructor({ id, nombre, categoria, stock, unidad, fechaVencimiento, estado }) {
    this.id = id
    this.nombre = nombre
    this.categoria = categoria
    this.stock = stock
    this.unidad = unidad
    this.fechaVencimiento = fechaVencimiento || null
    this.estado = estado || 'vigente'
  }
}

module.exports = Insumo