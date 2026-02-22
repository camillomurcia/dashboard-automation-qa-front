import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ModalFuncionalidad({ isOpen, onClose, onSave }) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    if (!isOpen) return null;

    const manejarEnvio = (e) => {
        e.preventDefault();
        onSave({ nombre, descripcion });
        setNombre(''); // Limpiamos al guardar
        setDescripcion('');
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                    <h3 className="text-xl font-bold text-slate-800">Nueva Funcionalidad</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-2 bg-slate-200 rounded-full">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={manejarEnvio} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                        <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej: Módulo de Pagos" className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                        <textarea required value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Breve descripción..." className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-24"></textarea>
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