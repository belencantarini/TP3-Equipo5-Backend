# 🏥 TP3 – Backend: Sistema de Gestión Clínica Integral

**Comisión IFST29 – Grupo 5 | Año: 2025**

Este proyecto corresponde al Tercer Parcial de Desarrollo Web Backend. Se desarrolló un sistema de gestión para una clínica médica aplicando **Node.js, Express, MongoDB, Mongoose y Pug**, manteniendo una estructura basada en **MVC** y un diseño orientado a una interfaz clínica clara y moderna.

---

## ⭐ Evolución del Proyecto

El desarrollo se realizó en entregas progresivas:

* ✔ **TP1 – Base del proyecto**
    * Configuración inicial con Node.js y Express
    * Rutas básicas
    * CRUD con archivos JSON
    * Primeros controladores y modelos
* ✔ **TP2 – Integración con MongoDB**
    * Migración gradual a MongoDB
    * Modelos Mongoose
    * Validaciones de datos
    * Incorporación de APIs
    * Primeras vistas dinámicas
* ✔ **TP3 – Versión Final**
    * Vistas Pug reorganizadas y mejoradas
    * Dashboard con estadísticas reales
    * Formularios con diseño clínico
    * Validaciones completas
    * CRUD operativo en todas las entidades
    * Conexión estable a MongoDB Atlas
    * Código ordenado bajo MVC

---

## 👥 Integrantes

* **Gabriela Aguilera** – Módulos Pacientes y Empleados, validaciones, rediseño de vistas y mejoras generales de interfaz.
* **Belén Cantarini Echezarreta** – Módulo Tareas y documentación del proyecto.
* **Damián Gómez De Leo** – Módulo Insumos y desarrollo de API complementaria.
* **Emiliano Núñez** – Conexión a MongoDB Atlas, rutas avanzadas y pruebas.

---

## 🏗 Arquitectura del Proyecto

El sistema utiliza una estructura clara basada en el patrón **MVC**

---

### 🔧 Tecnologías utilizadas

* Node.js + Express
* MongoDB + Mongoose
* Pug como motor de vistas
* Bootstrap 5 para estilos
* `method-override`
* `dotenv`
* JSON para persistencia complementaria

---
## 📡 Conexión a MongoDB

* Configurada en: `src/index.js`
* Incluye manejo de errores y *logs*.

---

## 📎 Repositorio y Despliegue del Proyecto

* 👉 https://github.com/belencantarini/TP3-Equipo5-Backend
* 👉 https://tp3-equipo5-backend.onrender.com

---

## 👩‍⚕️ Módulos desarrollados por Gabriela Aguilera

### 🩺 Pacientes

✔ **Funcionalidades**
* Listado completo
* Creación de pacientes
* Edición
* Eliminación
* Validaciones de campos
* Modelo Mongoose + persistencia JSON

✔ **Mejoras incorporadas**
* Diseño limpio y responsive
* Formularios modernos con campos bien distribuidos
* Botón “Volver” unificado
* Tablas estilizadas con Bootstrap
* Interfaz con colores clínicos (celeste/blanco)
* Código más ordenado y semántico

### 👤 Empleados

✔ **Funcionalidades**
* Listado general del personal
* Alta de empleados
* Edición de datos
* Eliminación
* Validaciones en *middleware*
* Modelo Mongoose + archivo JSON auxiliar

✔ **Mejoras incorporadas**
* Formularios más claros
* Diseño uniforme con el módulo Pacientes
* Botones y estilos consistentes
* Tablas responsivas
* Corrección de campos y estructura visual

### 📊 Dashboard (Portada)

La portada funciona como un panel administrativo con:
* Tarjetas de estadísticas (empleados, pacientes y tareas activas)
* Lectura dinámica desde las APIs
* Diseño institucional
* Hover sutil en tarjetas
* Enlaces directos a cada módulo
* Organización clara para el usuario

---
## Módulos desarrollados por Emiliano Nuñez
 
 ### Insumos

 **Funcionalidades**
 
 * Listado completo de insumos con estados (vigente, vencido, agotado)
 * Creación de insumos con formulario moderno
 * Edición de insumos con carga de datos desde MongoDB
 * Eliminación de insumos con confirmación
 * Validaciones de campos (stock, fecha de vencimiento, unidad)
 * Modelo Mongoose con persistencia en MongoDB

 **Mejoras incorporadas**
 
* Diseño unificado (igual a los otros módulos)
* Formularios claros con botón “Volver” y estilos consistentes
* Tablas estilizadas con colores de alerta:
* 🔴 Agotados → table-danger
* 🟡 Vencidos → table-warning
* Integración visual coherente con el resto del sistema
* Código ordenado y semántico, adaptado a MongoDB

 **Dashboard (Portada)**
 
 * Tarjeta de estadísticas de insumos integrada al panel principal
 * Conteo dinámico de insumos desde MongoDB
 * Visualización clara en rojo del total de insumos
 * Posibilidad de extender a subtotales por estado (vigente, vencido, agotado)
 * Diseño consistente con las demás tarjetas (Pacientes, Empleados, Tareas)

---

## 🛠️ Instalación y Ejecución Local

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### 1. Instalación de Dependencias

* Instala todas las dependencias del proyecto:
    ```bash
    npm i
    ```

### 2. Configuración de Variables de Entorno (.env)

* Crea el archivo **`.env`** en la raíz del proyecto.
* Copia la siguiente estructura y reemplaza los valores por tu URI de MongoDB Atlas:

> Ejemplo de .env
    ```bash
    > PORT=5000
    > MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster-url>/<nombre-de-la-bd> 
    ```

### 3. Creación del Usuario Administrador

* Para inicializar la base de datos con un usuario administrador, ejecuta el *script* de utilidad **una sola vez**:
    ```bash
    node src/utils/crearAdminSeguro.js
    ```

> 🔐 **Credenciales por Defecto:**
> * **Email:** `admin@clinica.com`
> * **Password:** `admin123`

### 4. Inicio del Servidor

* Inicia la aplicación con Nodemon:
    ```bash
    npm run dev
    ```
* Accede al sistema en tu navegador: `http://localhost:5000`

---
## 🛠️ Ejecución en la Web

Sigue estos pasos para acceder al sitio web y también probar la API del proyecto que ha sido desplegada en la nube con Render.

### 1. Acceso al Despliegue

El sitio web para la navegación y el *backend* de la API ya están operativos y se pueden acceder a través de la siguiente URL:

👉 **URL Base:** `https://tp3-equipo5-backend.onrender.com`  
_(Esta URL sirve para su acceso en el navegador y como prefijo para todas las rutas de la API para su prueba en Postman, por ejemplo: `/api/tareasmongo` o `/api/empleados`)._


### 2. Credenciales de Acceso (Por Defecto)

Para acceder a las secciones de la aplicación que requieren autenticación (como el *dashboard* y las vistas de administración), utiliza las siguientes credenciales preconfiguradas:

| Campo | Valor |
| :--- | :--- |
| **Email** | `admin@clinica.com` |
| **Password** | `admin123` |


### 3. Navegación en la URL

Una vez que se accede al URL, el servidor te redireccionará automáticamente a la página de inicio de sesión en donde se ingresan las credenciales. Una vez que inicies sesión, el servidor te enviará la cookie de sesión que tu navegador guardará, redireccionando a la página del Dashboard y de ahí a cada una de las secciones al cual el usuario tenga acceso.


### 4. 🔗 Rutas Clave de la API

Utilizando la URL base en herramientas como Postman, puedes realizar la autenticación con las credenciales correspondiente, puedes interactuar con los siguientes puntos de acceso (endpoints) principales de la API:

* **API Tareas (Mongo):** `/api/tareasmongo`  
* **API Pacientes (Mongo):** `/api/pacientes`  
* **API Empleados (Mongo):** `/api/empleados`  
* **API Insumos (Mongo):** `/api/insumos`  


---
## 🧪 Pruebas realizadas

* Pruebas ejecutadas con **Thunder Client** y **Postman**, incluyendo:
    * CRUD Pacientes
    * CRUD Empleados
    * CRUD Tareas (MongoDB)
    * CRUD Insumos
* (Se incluyen capturas en el informe PDF final.)

---

## 📘 Bibliografía

* Documentación de Node.js
* Express.js
* Mongoose
* Bootstrap 5
* Material teórico de la cátedra

## 🎥 Video de Defensa

El video mostrará:
* Arquitectura del proyecto
* Funcionamiento de cada módulo
* Modelos y validaciones
* Conexión y estructura de la base de datos
* Mejoras aplicadas desde TP1 hasta TP3
* (Se agregará el enlace cuando esté disponible.)



## 💬 Notas finales

El sistema cumple con:
* Patrón MVC
* API REST + vistas web
* Base de datos real en MongoDB
* Validaciones completas
* Buenas prácticas en rutas y controladores
* Diseño homogéneo e institucional
* Código organizado y mantenible


