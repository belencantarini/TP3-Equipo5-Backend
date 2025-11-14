const mongoose = require('mongoose');
require('dotenv').config();

// --- IMPORTACIÓN DE MODELOS (Ajusta la ruta si es necesario) ---
const Tarea = require('./src/models/TareaMongo'); 
const Insumo = require('./src/models/InsumoMongo');
const Empleado = require('./src/models/EmpleadoMongo');
const Paciente = require('./src/models/pacienteMongoModel');

// --- 1. DATOS DE PRUEBA SIMPLIFICADOS (3 EJEMPLOS POR COLECCIÓN) ---

// Empleados (Total 3)
const empleadosData = [{ 
    nombre: "Ricardo", apellido: "Silva", dni: "25998877", rol: "Administrativo", 
    area: "Administración de Turnos", email: "ricardo.s@test.com", activo: true
},{ 
    nombre: "Carla", apellido: "Rojas", dni: "30445566", rol: "Médico", 
    area: "Atención Médica", email: "carla.r@test.com", activo: true
},{
    nombre: "Ana", apellido: "Gómez", dni: "35667788", rol: "Encargado de Stock", 
    area: "Stock de Insumos", email: "a.gomez@test.com", activo: true
}];

// Pacientes (Total 3)
const pacientesData = [{ 
    nombre: "Laura", apellido: "Martínez", dni: "38112233", activo: true,
    email: "laura.m@test.com", telefono: "1155006600", obraSocial: "OSDE",
    fechaNacimiento: new Date('1985-06-15'), direccion: "Av. Corrientes 1234"
}, {
    nombre: "Carlos", apellido: "Rodríguez", dni: "28776655", activo: true, 
    email: "c.rodriguez@test.com", telefono: "1144332211", obraSocial: "PAMI", 
    fechaNacimiento: new Date('1950-01-20'), direccion: "Calle Falsa 123"
}, {
    nombre: "Elena", apellido: "Sánchez", dni: "42109876", activo: false, 
    email: "e.sanchez@test.com", telefono: "1122334455", obraSocial: "Swiss Medical", 
    fechaNacimiento: new Date('2001-11-05'), direccion: "Libertador 500"
}];


// Insumos (Total 3)
const insumosData = [{
    nombre: "Paracetamol 500mg", categoria: "medicamento", stock: 150, unidad: "Cajas", 
    fechaVencimiento: new Date('2026-10-01'), estado: "vigente", activo: true
}, {
    nombre: "Jeringas 5ml", categoria: "descartable", stock: 500, unidad: "Unidades", 
    fechaVencimiento: new Date('2025-05-20'), estado: "vigente", activo: true
}, {
    nombre: "Tramadol", categoria: "medicamento", stock: 5, unidad: "Cajas", 
    fechaVencimiento: new Date('2024-01-20'), estado: "vencido", activo: true
}];

// Tareas (Total 3 - usando placeholders _EMP_ e _PAC_)
const tareasFijas = [{
    area: "Administración de Turnos", tipo: "Alta de turno", estado: "Completada", 
    prioridad: "Alta", fechaInicio: new Date('2024-05-01'), fechaFin: new Date('2024-05-01'), 
    empleadoId: null, pacienteId: null, observaciones: "Turno asignado con Médico Carla Rojas."
}, {
    area: "Atención Médica", tipo: "Consulta inicial", estado: "En Progreso", 
    prioridad: "Media", fechaInicio: new Date('2024-05-20'), fechaFin: null, 
    empleadoId: null, pacienteId: null, observaciones: "Paciente con tos persistente."
}, {
    area: "Stock de Insumos", tipo: "Carga de nuevo insumo", estado: "Pendiente", 
    prioridad: "Alta", fechaInicio: new Date('2024-05-25'), fechaFin: null, 
    empleadoId: null, pacienteId: null, proveedor: "Farmacias del Sur", 
    observaciones: "Esperando llegada de Paracetamol."
}];

// ----------------------------------------------------
// 2. FUNCIÓN PRINCIPAL DE SIEMBRA
// ----------------------------------------------------

const seedDB = async () => {
    try {
        // Conexión
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conexión a MongoDB exitosa.');

        // 2.1. Limpieza
        console.log('--- Limpiando colecciones existentes...');
        await Empleado.deleteMany({});
        await Insumo.deleteMany({});
        await Paciente.deleteMany({});
        await Tarea.deleteMany({});
        console.log("Limpieza completada.");

        // 2.2. INSERCIÓN DE EMPLEADOS, PACIENTES E INSUMOS
        console.log('--- Insertando datos base...');
        
        const empleadosInsertados = await Empleado.insertMany(empleadosData);
        const pacientesInsertados = await Paciente.insertMany(pacientesData);
        const insumos = await Insumo.insertMany(insumosData);

        console.log(`✅ ${empleadosInsertados.length} Empleados, ${pacientesInsertados.length} Pacientes y ${insumos.length} Insumos cargados.`);
        
        // 2.3. GENERACIÓN Y REEMPLAZO DE IDS EN TAREAS
        const empleadoIds = empleadosInsertados.map(emp => emp._id);
        const pacienteIds = pacientesInsertados.map(pac => pac._id);
        
        console.log('--- Generando Tareas y mapeando IDs...');

        const tareasFinales = tareasFijas.map(tarea => {
            const nuevaTarea = { ...tarea }; 
            
            // Reemplazo para Empleado
            if (nuevaTarea.empleadoId && nuevaTarea.empleadoId.startsWith('_EMP_')) {
                const index = parseInt(nuevaTarea.empleadoId.substring(5)); 
                nuevaTarea.empleadoId = empleadoIds[index];
            }

            // Reemplazo para Paciente
            if (nuevaTarea.pacienteId && nuevaTarea.pacienteId.startsWith('_PAC_')) {
                const index = parseInt(nuevaTarea.pacienteId.substring(5)); 
                nuevaTarea.pacienteId = pacienteIds[index];
            }
            return nuevaTarea;
        });

        // 2.4. INSERCIÓN DE TAREAS
        const tareas = await Tarea.insertMany(tareasFinales);
        console.log(`✅ ${tareas.length} Tareas cargadas con referencias válidas.`);

        console.log('\n✨✨ DATOS DE SIEMBRA COMPLETADOS CON ÉXITO. ✨✨');

    } catch (error) {
        console.error('\n❌ ERROR FATAL durante el Seeding:', error.message);
    } finally {
        // 2.5. CERRAR LA CONEXIÓN
        await mongoose.connection.close();
        console.log('Conexión a MongoDB cerrada.');
    }
};

// ----------------------------------------------------
// 3. INICIO DE EJECUCIÓN
// ----------------------------------------------------
seedDB();