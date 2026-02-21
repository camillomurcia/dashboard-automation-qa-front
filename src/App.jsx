import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import VistaOperaciones from './pages/VistaOperaciones';

// --- DATOS MOCK (Falsos) TEMPORALES ---
const DATOS_FUNCIONALIDADES = [
    { id: 1, nombre: 'Módulo de Autenticación', descripcion: 'Login, Registro y Recuperación' },
    { id: 2, nombre: 'Gestión de Carrito', descripcion: 'Añadir, eliminar y pagar productos' }
];

const DATOS_OPERACIONES = [
    { id: 1, funcId: 1, nombre: 'Iniciar sesión exitoso', totalEscenarios: 5, automatizados: 5, estadoManual: null },
    { id: 2, funcId: 1, nombre: 'Recuperar contraseña', totalEscenarios: 4, automatizados: 1, estadoManual: null },
    { id: 3, funcId: 1, nombre: 'Bloqueo de cuenta', totalEscenarios: 3, automatizados: 0, estadoManual: null },
    { id: 4, funcId: 2, nombre: 'Pago rechazado', totalEscenarios: 2, automatizados: 1, estadoManual: 'Análisis a automatizar' }
];

export default function App() {
    // Estado de Navegación
    const [vistaActual, setVistaActual] = useState({ tipo: 'dashboard', funcId: null });

    // Lógicas de Estado y Estilos (Las que tenías en tu HTML)
    const calcularEstado = (op) => {
        if (op.estadoManual) return op.estadoManual;
        if (op.automatizados === 0) return 'Manual';
        if (op.automatizados > 0 && op.automatizados < op.totalEscenarios) return 'Parcial';
        if (op.automatizados >= op.totalEscenarios) return 'Completado';
    };

    const estilosEstado = {
        'Manual': 'bg-slate-100 text-slate-700 border-slate-200',
        'Parcial': 'bg-blue-100 text-blue-700 border-blue-200',
        'Completado': 'bg-green-100 text-green-700 border-green-200',
        'No automatizable': 'bg-red-100 text-red-700 border-red-200',
        'Análisis a automatizar': 'bg-amber-100 text-amber-700 border-amber-200'
    };

    // Navegación ("Router" casero)
    if (vistaActual.tipo === 'dashboard') {
        return (
            <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
                <Dashboard 
                    funcionalidades={DATOS_FUNCIONALIDADES} 
                    onSelect={(id) => setVistaActual({ tipo: 'operaciones', funcId: id })} 
                />
            </div>
        );
    }

    // Si no es dashboard, filtramos las operaciones que pertenecen a la tarjeta clickeada
    const funcSeleccionada = DATOS_FUNCIONALIDADES.find(f => f.id === vistaActual.funcId);
    const operacionesFiltradas = DATOS_OPERACIONES.filter(o => o.funcId === vistaActual.funcId);

    return (
        <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
            <VistaOperaciones 
                funcionalidad={funcSeleccionada} 
                operaciones={operacionesFiltradas}
                onBack={() => setVistaActual({ tipo: 'dashboard', funcId: null })}
                calcularEstado={calcularEstado}
                estilosEstado={estilosEstado}
            />
        </div>
    );
}