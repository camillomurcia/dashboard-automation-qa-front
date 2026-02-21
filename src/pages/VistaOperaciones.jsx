import React, { useMemo, useState } from 'react'; // Agregamos useState
import { ArrowLeft, Settings, Layers, Check, User, Plus, Edit } from 'lucide-react';
import ModalOperacion from '../components/ModalOperacion'; // Importamos el modal


export default function VistaOperaciones({ 
    funcionalidad, 
    operaciones, 
    onBack, 
    calcularEstado, 
    estilosEstado 
}) {

    // Estados para controlar el Modal
    const [modalAbierto, setModalAbierto] = useState(false);
    const [operacionParaEditar, setOperacionParaEditar] = useState(null);

    // Función temporal para cuando guardamos en el modal
    const manejarGuardar = (datos) => {
        console.log("Datos a guardar:", datos);
        alert("Simulando guardado... ¡Luego conectaremos con Java!");
        setModalAbierto(false); // Cerramos el modal
    };
    
    // 1. Cálculos automáticos para las tarjetas de arriba
    const metricas = useMemo(() => {
        const total = operaciones.reduce((acc, op) => acc + op.totalEscenarios, 0);
        const auto = operaciones.reduce((acc, op) => acc + op.automatizados, 0);
        const manual = total - auto;
        const porcentaje = total === 0 ? 0 : Math.round((auto / total) * 100);
        return { total, auto, manual, porcentaje };
    }, [operaciones]);

    // 2. Variables para que el gráfico circular se dibuje y se mueva
    const radio = 40;
    const circunferencia = 2 * Math.PI * radio;
    const dashOffset = circunferencia - (metricas.porcentaje / 100) * circunferencia;

    return (
        <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
            {/* Botón de Volver */}
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors font-medium">
                <ArrowLeft size={20} /> Volver al Dashboard
            </button>

            {/* --- SECCIÓN 1: TARJETAS DE MÉTRICAS --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Gráfico Circular (Donut) */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-6">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="transform -rotate-90 w-24 h-24">
                            <circle cx="48" cy="48" r={radio} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                            <circle cx="48" cy="48" r={radio} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circunferencia} strokeDashoffset={dashOffset} className="text-indigo-600 transition-all duration-1000 ease-out" strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-xl font-bold text-slate-800">{metricas.porcentaje}%</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Progreso Total</p>
                        <h3 className="text-lg font-bold text-slate-800">Automatización</h3>
                    </div>
                </div>

                {/* Tarjetas de Totales */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-slate-500 mb-2">
                        <span className="p-2 bg-slate-100 rounded-lg"><Layers size={18} /></span>
                        <span className="font-medium text-sm">Total Escenarios</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">{metricas.total}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-slate-500 mb-2">
                        <span className="p-2 bg-green-50 text-green-600 rounded-lg"><Check size={18} /></span>
                        <span className="font-medium text-sm">Automatizados</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">{metricas.auto}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-slate-500 mb-2">
                        <span className="p-2 bg-amber-50 text-amber-600 rounded-lg"><User size={18} /></span>
                        <span className="font-medium text-sm">Manuales</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">{metricas.manual}</p>
                </div>
            </div>

            {/* --- SECCIÓN 2: LA TABLA --- */}
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
                            {operaciones.length === 0 ? (
                                <tr><td colSpan="7" className="text-center p-10 text-slate-400">No hay operaciones creadas.</td></tr>
                            ) : (
                                operaciones.map(op => {
                                    const estadoActual = calcularEstado(op);
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
            {/* Renderizamos el Modal aquí abajo. Sus props controlan si se ve o no */}
            <ModalOperacion 
                isOpen={modalAbierto} 
                onClose={() => setModalAbierto(false)} 
                onSave={manejarGuardar}
                operacionAEditar={operacionParaEditar}
            />
        </div>
    );
}