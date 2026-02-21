import React from 'react';
import { LayoutDashboard, Folder } from 'lucide-react'; // Íconos modernos

// Este componente recibe las "funcionalidades" (la lista de datos) 
// y "onSelect" (la acción que haremos al hacer clic)
export default function Dashboard({ funcionalidades, onSelect }) {
    return (
        <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
            {/* Encabezado */}
            <header className="mb-10 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-slate-800">
                        <span className="text-indigo-600"><LayoutDashboard size={32} /></span> 
                        Dashboard QA
                    </h1>
                    <p className="text-slate-500 mt-2">Gestiona las operaciones y el progreso de automatización.</p>
                </div>
            </header>

            {/* Grilla de Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Recorremos la lista de datos y dibujamos una tarjeta por cada uno */}
                {funcionalidades.map(func => (
                    <div 
                        key={func.id} 
                        onClick={() => onSelect(func.id)} 
                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer group"
                    >
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors text-indigo-600 group-hover:text-white">
                            <Folder size={24} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-800">{func.nombre}</h3>
                        <p className="text-slate-500 text-sm">{func.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}