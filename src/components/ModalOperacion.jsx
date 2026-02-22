import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { estadoService } from '../services/api'; 

// 🚨 Agregamos 'isOpen' a las props para controlar la visibilidad
export default function ModalOperacion({ isOpen, operacionAEditar, onSave, onClose }) {
    
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState('');
    const [auto, setAuto] = useState('');
    
    const [estadosDb, setEstadosDb] = useState([]); 
    const [estadoId, setEstadoId] = useState('');

    useEffect(() => {
        // Solo hacemos la petición a la BD si el modal está abierto para ahorrar recursos
        if (isOpen) {
            estadoService.obtenerTodosEstados()
                .then(data => setEstadosDb(data))
                .catch(err => console.error("Error cargando estados:", err));
        }

        if (isOpen && operacionAEditar) {
            setNombre(operacionAEditar.nombre);
            setTotal(operacionAEditar.totalEscenarios);
            setAuto(operacionAEditar.automatizados);
            
            if (operacionAEditar.estado && operacionAEditar.estado.requiereAccionHumana) {
                setEstadoId(operacionAEditar.estado.id);
            } else {
                setEstadoId('');
            }
        } else if (!isOpen) {
            // Limpiamos los campos cuando se cierra el modal
            setNombre('');
            setTotal('');
            setAuto('');
            setEstadoId('');
        }
    }, [isOpen, operacionAEditar]);

    const esEstadoManual = estadosDb.some(est => est.id === Number(estadoId) && est.requiereAccionHumana);

    useEffect(() => {
        if (esEstadoManual) {
            setAuto(0);
        }
    }, [estadoId, esEstadoManual]);

    const manejarEnvio = (e) => {
        e.preventDefault();
        
        const payload = {
            id: operacionAEditar ? operacionAEditar.id : null,
            nombre: nombre,
            totalEscenarios: total === '' ? 0 : Number(total),
            automatizados: esEstadoManual ? 0 : (auto === '' ? 0 : Number(auto)),
            estado: estadoId === '' ? null : { id: Number(estadoId) }
        };
        
        onSave(payload);
    };

    // 🚨 LA PROTECCIÓN PARA QUE NO SE ABRA SOLO
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">
                        {operacionAEditar ? 'Editar Operación' : 'Nueva Operación'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
                
                <form onSubmit={manejarEnvio} className="p-6">
                    {/* 1. NOMBRE */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre de la Operación</label>
                        <input 
                            type="text" 
                            required
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="Ej. Login con credenciales válidas"
                        />
                    </div>

                    {/* 2. TOTAL ESCENARIOS */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Total de Escenarios</label>
                        <input 
                            type="number" 
                            required
                            min="1"
                            value={total}
                            onChange={(e) => {
                                const nuevoTotal = e.target.value;
                                setTotal(nuevoTotal);
                                // Si los automatizados son mayores al nuevo total, ajustar
                                if (Number(auto) > Number(nuevoTotal)) {
                                    setAuto(nuevoTotal);
                                }
                            }}
                            className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="Ej. 10"
                        />
                    </div>

                    {/* 3. ESCENARIOS AUTOMATIZADOS (Vuelve a su lugar original) */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Escenarios Automatizados</label>
                        <input 
                            type="number" 
                            min="0"
                            max={total || 0}
                            value={auto}
                            onChange={(e) => {
                                const valor = Number(e.target.value);
                                const totalNum = Number(total) || 0;
                                if (valor <= totalNum) {
                                    setAuto(e.target.value);
                                }
                            }}
                            disabled={esEstadoManual} 
                            className={`w-full p-3 border rounded-xl outline-none transition-colors
                                ${esEstadoManual 
                                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                                    : 'bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500'}`}
                            placeholder={esEstadoManual ? "No aplica para este estado" : "Ej. 5"}
                        />
                    </div>

                    {/* 4. COMPORTAMIENTO ESPECIAL / ESTADO */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Comportamiento Especial (Opcional)</label>
                        <select 
                            value={estadoId}
                            onChange={(e) => setEstadoId(e.target.value)}
                            className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="">Automático (Calculado por sistema)</option>
                            {estadosDb
                                .filter(est => est.requiereAccionHumana === true)
                                .map(est => (
                                <option key={est.id} value={est.id}>{est.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="px-5 py-2.5 bg-indigo-600 text-white font-medium hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
                        >
                            {operacionAEditar ? 'Guardar Cambios' : 'Crear Operación'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}