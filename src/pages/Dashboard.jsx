import React, { useState } from 'react';
import { LayoutDashboard, Folder, Plus } from 'lucide-react';
import ModalFuncionalidad from '../components/ModalFuncionalidad';

export default function Dashboard({ funcionalidades, onSelect, onCrear }) {
    const [modalAbierto, setModalAbierto] = useState(false);

    const manejarGuardar = (datos) => {
        onCrear(datos);
        setModalAbierto(false);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
            <header className="mb-10 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-slate-800">
                        <span className="text-indigo-600"><LayoutDashboard size={32} /></span> 
                        Dashboard QA
                    </h1>
                    <p className="text-slate-500 mt-2">Gestiona las operaciones y el progreso de automatización.</p>
                </div>
                {/* BOTÓN NUEVO */}
                <button onClick={() => setModalAbierto(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/30">
                    <Plus size={20} /> Nueva Funcionalidad
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {funcionalidades.length === 0 ? (
                    <div className="col-span-full text-center p-10 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300">
                        No hay funcionalidades. ¡Crea la primera!
                    </div>
                ) : (
                    funcionalidades.map(func => (
                        <div key={func.id} onClick={() => onSelect(func.id)} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors text-indigo-600 group-hover:text-white">
                                <Folder size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-800">{func.nombre}</h3>
                            <p className="text-slate-500 text-sm line-clamp-2">{func.descripcion}</p>
                        </div>
                    ))
                )}
            </div>

            <ModalFuncionalidad isOpen={modalAbierto} onClose={() => setModalAbierto(false)} onSave={manejarGuardar} />
        </div>
    );
}