import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ModalOperacion({ isOpen, onClose, onSave, operacionAEditar }) {
    // ESTADOS DEL FORMULARIO: Guardan lo que el usuario escribe
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState('');
    const [auto, setAuto] = useState('');
    const [estadoManual, setEstadoManual] = useState('');

    // useEffect es un "vigilante". Cuando el modal se abre, revisa si hay una operación para editar.
    // Si la hay, llena los campos. Si no, los deja en blanco (para crear una nueva).
    useEffect(() => {
        if (operacionAEditar) {
            setNombre(operacionAEditar.nombre);
            setTotal(operacionAEditar.totalEscenarios);
            setAuto(operacionAEditar.automatizados);
            setEstadoManual(operacionAEditar.estadoManual || '');
        } else {
            setNombre('');
            setTotal('');
            setAuto('0');
            setEstadoManual('');
        }
    }, [operacionAEditar, isOpen]);

    // Si isOpen es falso, no dibujamos nada (retorna null)
    if (!isOpen) return null;

    // Función que se ejecuta al darle al botón "Guardar"
    const manejarEnvio = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        // Empaquetamos los datos y se los mandamos al componente padre

        // 1. Forzamos la conversión a Número de forma estricta
        const totalNum = total === '' ? 0 : Number(total);
        const autoNum = auto === '' ? 0 : Number(auto);

        // 2. Empaquetamos los datos
        const payload = {
            id: operacionAEditar ? operacionAEditar.id : null,
            nombre: nombre,
            totalEscenarios: totalNum,
            // Si estamos creando forzamos 0, si estamos editando mandamos el número exacto (incluso si es 0)
            automatizados: operacionAEditar ? autoNum : 0, 
            estadoManual: estadoManual === '' ? null : estadoManual
        };
        
        onSave(payload);
    };

    const esCreacion = !operacionAEditar;

    return (
        // Fondo oscuro borroso (Overlay)
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            {/* Caja blanca del Modal */}
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200">
                {/* Cabecera */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                    <h3 className="text-xl font-bold text-slate-800">
                        {operacionAEditar ? 'Editar Operación' : 'Nueva Operación'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-2 bg-slate-200 rounded-full hover:bg-slate-300">
                        <X size={20} />
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={manejarEnvio} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de la Operación</label>
                        <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej: Login Exitoso" className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Total Escenarios</label>
                            <input type="number" required min="1" value={total} onChange={e => setTotal(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Automatizados</label>
                            <input type="number" required min="0" max={total || 999} value={auto} onChange={e => setAuto(e.target.value)} 
                                disabled={esCreacion} // Bloquea el input si es una creación
                                title={esCreacion ? "Solo se puede actualizar al editar la operación" : ""}
                                className={`w-full border rounded-xl px-4 py-2.5 outline-none transition-all 
                                    ${esCreacion 
                                        ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' // Estilo bloqueado
                                        : 'bg-white border-slate-300 focus:ring-2 focus:ring-indigo-500'    // Estilo normal
                                    }`} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Forzar Estado (Opcional)</label>
                        <select value={estadoManual} onChange={e => setEstadoManual(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-all">
                            <option value="">Automático (Calculado)</option>
                            <option value="No automatizable">No automatizable</option>
                            <option value="Análisis a automatizar">Análisis a automatizar</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-colors">Cancelar</button>
                        <button type="submit" className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/30">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}