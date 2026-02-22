import React, { useMemo, useState, useEffect } from 'react';
import { ArrowLeft, Settings, Layers, Check, User, Plus, Edit } from 'lucide-react';
import ModalOperacion from '../components/ModalOperacion';
import { operacionService } from '../services/api'; // NUESTRA CONEXIÓN A JAVA

export default function VistaOperaciones({ 
    funcionalidad, 
    onBack,  
    estilosEstado
}) {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [operacionParaEditar, setOperacionParaEditar] = useState(null);
    const [estadisticas, setEstadisticas] = useState([]);
    
    // NUEVO ESTADO: Aquí guardaremos lo que responda la base de datos
    const [operacionesReales, setOperacionesReales] = useState([]);

    // NUEVA FUNCIÓN: Va hasta Java y trae los datos de la funcionalidad actual
    const cargarDatos = async () => {
        try {
            const data = await operacionService.buscarPorFuncionalidad(funcionalidad.id);
            setOperacionesReales(data);
            const dataStats = await operacionService.obtenerEstadisticas(funcionalidad.id);
            setEstadisticas(dataStats);
        } catch (error) {
            console.error("Error al cargar de Java:", error);
        }
    };

    // EL VIGILANTE: Apenas se abre esta pantalla, ejecuta 'cargarDatos()' una vez
    useEffect(() => {
        cargarDatos();
    }, [funcionalidad.id]);

    // Los cálculos matemáticos ahora usan 'operacionesReales'
    const metricas = useMemo(() => {
        const total = operacionesReales.reduce((acc, op) => acc + op.totalEscenarios, 0);
        const auto = operacionesReales.reduce((acc, op) => acc + op.automatizados, 0);
        const manual = total - auto;
        const porcentaje = total === 0 ? 0 : Math.round((auto / total) * 100);
        return { total, auto, manual, porcentaje };
    }, [operacionesReales]);

    const radio = 40;
    const circunferencia = 2 * Math.PI * radio;
    const dashOffset = circunferencia - (metricas.porcentaje / 100) * circunferencia;

    // LA MAGIA DE GUARDAR: Envía el JSON a tu puerto 8080
    const manejarGuardar = async (datos) => {
        try {
            // Le inyectamos a qué funcionalidad pertenece antes de enviarlo
            const datosCompletos = { ...datos, funcionalidadId: funcionalidad.id };

            if (datos.id) {
                await operacionService.actualizar(datos.id, datosCompletos);
            } else {
                await operacionService.crear(datosCompletos);
            }
            
            setModalAbierto(false); // Cerramos la ventanita
            cargarDatos(); // ¡Recargamos la tabla para ver el nuevo registro al instante!
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("No se pudo guardar. Revisa si Spring Boot está encendido en el puerto 8080.");
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors font-medium">
                <ArrowLeft size={20} /> Volver al Dashboard
            </button>

            {/* SECCIÓN 1: Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
{/* 1. Gráfico Circular (Ahora en columna, a prueba de todo) */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center gap-4">
                    
                    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                        <svg className="transform -rotate-90 w-24 h-24">
                            <circle cx="48" cy="48" r={radio} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                            <circle cx="48" cy="48" r={radio} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circunferencia} strokeDashoffset={dashOffset} className="text-indigo-600 transition-all duration-1000 ease-out" strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-xl font-bold text-slate-800">
                            {Math.round(estadisticas.porcentajeCobertura)}%
                        </span>
                    </div>
                    
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Progreso Total</p>
                        <h3 className="text-lg font-bold text-slate-800">Automatización</h3>
                    </div>
                    
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-slate-500 mb-2">
                        <span className="p-2 bg-slate-100 rounded-lg"><Layers size={18} /></span>
                        <span className="font-medium text-sm">Total Escenarios</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">{estadisticas.totalEscenarios}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-slate-500 mb-2">
                        <span className="p-2 bg-green-50 text-green-600 rounded-lg"><Check size={18} /></span>
                        <span className="font-medium text-sm">Automatizados</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">{estadisticas.totalAutomatizados}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-slate-500 mb-2">
                        <span className="p-2 bg-amber-50 text-amber-600 rounded-lg"><User size={18} /></span>
                        <span className="font-medium text-sm">Manuales</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">{estadisticas.totalManuales}</p>
                </div>
            </div>

            {/* SECCIÓN 2: Tabla */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-200 flex flex-col md:flex-row justify-between md:items-center gap-4 bg-slate-900 text-white">
                    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                        <span className="text-indigo-400"><Settings size={24} /></span> {funcionalidad.nombre}
                    </h2>
                    <button onClick={() => { setOperacionParaEditar(null); setModalAbierto(true); }} className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/30">
                        <Plus size={20} /> Nueva Operación
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 text-xs uppercase tracking-wider">
                                <th className="p-5 font-semibold">Operación</th>
                                <th className="p-5 font-semibold text-center">Total</th>
                                <th className="p-5 font-semibold text-center text-indigo-600">Auto</th>
                                <th className="p-5 font-semibold text-center text-amber-600">Manual</th>
                                <th className="p-5 font-semibold w-48">Progreso</th>
                                <th className="p-5 font-semibold">Estado</th>
                                <th className="p-5 font-semibold text-right">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Cambiamos para que dibuje las operaciones reales */}
                            {operacionesReales.length === 0 ? (
                                <tr><td colSpan="7" className="text-center p-10 text-slate-400">No hay operaciones creadas aún.</td></tr>
                            ) : (
                                operacionesReales.map(op => {
                                    const estadoActual = op.estado; // ✅ (Asegúrate de que así se llame la propiedad en tu DTO de Java, puede ser op.estadoCalculado)
                                    const manuales = op.totalEscenarios - op.automatizados;
                                    const porcentaje = op.totalEscenarios === 0 ? 0 : Math.round((op.automatizados / op.totalEscenarios) * 100);

                                    return (
                                        <tr key={op.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="p-5 font-medium text-slate-800">{op.nombre}</td>
                                            <td className="p-5 text-center text-slate-600">{op.totalEscenarios}</td>
                                            <td className="p-5 text-center font-bold text-indigo-600">{op.automatizados}</td>
                                            <td className="p-5 text-center font-bold text-amber-600">{manuales}</td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                                                        <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{width: `${porcentaje}%`}}></div>
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-600 w-8">{porcentaje}%</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${estilosEstado[estadoActual]}`}>
                                                    {estadoActual}
                                                </span>
                                            </td>
                                            <td className="p-5 text-right">
                                                <button onClick={() => { setOperacionParaEditar(op); setModalAbierto(true); }} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all inline-flex">
                                                    <Edit size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalOperacion 
                isOpen={modalAbierto} 
                onClose={() => setModalAbierto(false)} 
                onSave={manejarGuardar}
                operacionAEditar={operacionParaEditar}
            />
        </div>
    );
}