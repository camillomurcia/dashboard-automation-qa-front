import axios from 'axios';

// Creamos una instancia de Axios con la URL base de tu Backend en Java.
// Así no tenemos que escribir "http://localhost:8080/api" en cada petición.
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// --- FUNCIONES PARA LAS OPERACIONES ---

// Evita depender de `this` dentro de los métodos (puede ser undefined si las funciones
// se extraen o se usan como callbacks). Usamos una constante compartida.
const NOMBRE_SERVICIO = 'operacion';

export const operacionService = {

    nombreServicio: NOMBRE_SERVICIO,

    async buscarPorFuncionalidad(funcionalidadId) {
        const response = await api.get(`/${NOMBRE_SERVICIO}/buscarFuncionalidad/${funcionalidadId}`, { funcionalidadId });
        return response.data;
    },

    // 2. Crear una nueva operación
    async crear(datos) {
        const response = await api.post(`/${NOMBRE_SERVICIO}/crearOperacion`, datos);
        return response.data;
    },

    // 3. Actualizar una operación existente
    async actualizar(id, datos) {
        const response = await api.put(`/${NOMBRE_SERVICIO}/actualizarOperacion/${id}`, datos);
        return response.data;
    },

    async obtenerEstadisticas(funcionalidadId) {
        const response = await api.get(`/operacion/estadisticas/${funcionalidadId}`);
        return response.data;
    },
};

const NOMBRE_FUNCIONALIDAD = 'funcionalidad';


export const funcionalidadService = {
    // Traer todas las funcionalidades para dibujarlas en el inicio
    async obtenerTodas() {
        const response = await api.get(`/${NOMBRE_FUNCIONALIDAD}`);
        return response.data;
    },
    // Crear una nueva
    async crear(datos) {
        const response = await api.post(`/${NOMBRE_FUNCIONALIDAD}/crearFuncionalidad`, datos);
        return response.data;
    }
};

const NOMBRE_ESTADOS = 'estados';

export const estadoService = {

    // Traer todas los estados para dibujarlas en el inicio
    async obtenerTodosEstados() {
        const response = await api.get(`/${NOMBRE_ESTADOS}`);
        return response.data;
    },
};

export default api;