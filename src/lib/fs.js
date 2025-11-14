const fs = require('fs/promises')

const PATH_BASE = './src/data'

async function leerData(coleccion) {
    const ubicacion = `${PATH_BASE}/${coleccion}.json`

    const data = await fs.readFile(ubicacion)
    return JSON.parse(data)
}

async function escribirData(coleccion, data) {
    const ubicacion = `${PATH_BASE}/${coleccion}.json`

    await fs.writeFile(ubicacion, JSON.stringify(data, null, 4))
}

module.exports = { leerData, escribirData }
