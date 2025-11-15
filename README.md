🏥 TP3 – Backend
Sistema de Gestión Clínica Integral

Comisión IFST29 – Grupo 5
Año: 2025

Este proyecto corresponde al Tercer Parcial de Desarrollo Web Backend.
Se desarrolló un sistema de gestión para una clínica médica aplicando Node.js, Express, MongoDB, Mongoose y Pug, manteniendo una estructura basada en MVC y un diseño orientado a una interfaz clínica clara y moderna.

⭐ Evolución del Proyecto

El desarrollo se realizó en entregas progresivas:

✔ TP1 – Base del proyecto

Configuración inicial con Node.js y Express

Rutas básicas

CRUD con archivos JSON

Primeros controladores y modelos

✔ TP2 – Integración con MongoDB

Migración gradual a MongoDB

Modelos Mongoose

Validaciones de datos

Incorporación de APIs

Primeras vistas dinámicas

✔ TP3 – Versión Final

Vistas Pug reorganizadas y mejoradas

Dashboard con estadísticas reales

Formularios con diseño clínico

Validaciones completas

CRUD operativo en todas las entidades

Conexión estable a MongoDB Atlas

Código ordenado bajo MVC

👥 Integrantes

Gabriela Aguilera – Módulos Pacientes y Empleados, validaciones, rediseño de vistas y mejoras generales de interfaz.

Belén Cantarini Echezarreta – Módulo Tareas y documentación del proyecto.

Damián Gómez De Leo – Módulo Insumos y desarrollo de API complementaria.

Emiliano Núñez – Conexión a MongoDB Atlas, rutas avanzadas y pruebas.

🏗 Arquitectura del Proyecto

El sistema utiliza una estructura clara basada en el patrón MVC:

/src
  /controllers
  /models
  /routes
  /views
  /middlewares
  /lib
  index.js

🔧 Tecnologías utilizadas

Node.js + Express

MongoDB + Mongoose

Pug como motor de vistas

Bootstrap 5 para estilos

method-override

dotenv

JSON para persistencia complementaria

👩‍⚕️ Módulos desarrollados por Gabriela Aguilera
🩺 Pacientes
✔ Funcionalidades

Listado completo

Creación de pacientes

Edición

Eliminación

Validaciones de campos

Modelo Mongoose + persistencia JSON

✔ Mejoras incorporadas

Diseño limpio y responsive

Formularios modernos con campos bien distribuidos

Botón “Volver” unificado

Tablas estilizadas con Bootstrap

Interfaz con colores clínicos (celeste/blanco)

Código más ordenado y semántico

👤 Empleados
✔ Funcionalidades

Listado general del personal

Alta de empleados

Edición de datos

Eliminación

Validaciones en middleware

Modelo Mongoose + archivo JSON auxiliar

✔ Mejoras incorporadas

Formularios más claros

Diseño uniforme con el módulo Pacientes

Botones y estilos consistentes

Tablas responsivas

Corrección de campos y estructura visual

📊 Dashboard (Portada)

La portada funciona como un panel administrativo con:

Tarjetas de estadísticas (empleados, pacientes y tareas activas)

Lectura dinámica desde las APIs

Diseño institucional

Hover sutil en tarjetas

Enlaces directos a cada módulo

Organización clara para el usuario

🔧 Instalación
npm install
npm run dev

🔐 Variables de entorno (.env)

Ejemplo:

MONGO_URI=mongodb+srv://...
PORT=5000

📡 Conexión a MongoDB

Configurada en:

src/index.js


Incluye manejo de errores y logs.

🧪 Pruebas realizadas

Pruebas ejecutadas con Thunder Client, incluyendo:

CRUD Pacientes

CRUD Empleados

CRUD Tareas (MongoDB)

CRUD Insumos

(Se incluyen capturas en el informe PDF final.)

📘 Bibliografía

Documentación de Node.js

Express.js

Mongoose

Bootstrap 5

Material teórico de la cátedra

🎥 Video de Defensa

El video mostrará:

Arquitectura del proyecto

Funcionamiento de cada módulo

Modelos y validaciones

Conexión y estructura de la base de datos

Mejoras aplicadas desde TP1 hasta TP3

(Se agregará el enlace cuando esté disponible.)

📎 Repositorio del Proyecto

👉 https://github.com/belencantarini/TP3-Equipo5-Backend

💬 Notas finales

El sistema cumple con:

Patrón MVC

API REST + vistas web

Base de datos real en MongoDB

Validaciones completas

Buenas prácticas en rutas y controladores

Diseño homogéneo e institucional

Código organizado y mantenible