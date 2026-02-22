import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import VistaOperaciones from './pages/VistaOperaciones';
import { funcionalidadService } from './services/api';

export default function App() {
    const [vistaActual, setVistaActual] = useState({ tipo: 'dashboard', funcId: null });
    
    // ESTADO REAL DESDE JAVA
    const [funcionalidades, setFuncionalidades] = useState([]);

    // Cargar desde Java al arrancar
    const cargarFuncionalidades = async () => {
        try {
            const data = await funcionalidadService.obtenerTodas();
            setFuncionalidades(data);
        } catch (error) {
            console.error("Error al cargar funcionalidades:", error);
        }
    };

    useEffect(() => {
        cargarFuncionalidades();
    }, []);

    // Función para guardar en Java
    const manejarCrearFuncionalidad = async (datos) => {
        try {
            await funcionalidadService.crear(datos);
            cargarFuncionalidades(); // Recargar la lista tras guardar
        } catch (error) {
            console.error("Error al crear:", error);
            alert("No se pudo crear. Verifica que Spring Boot esté corriendo.");
        }
    };


    const estilosEstado = {
        'Manual': 'bg-slate-100 text-slate-700 border-slate-200',
        'Parcial': 'bg-blue-100 text-blue-700 border-blue-200',
        'Completado': 'bg-green-100 text-green-700 border-green-200',
        'No automatizable': 'bg-red-100 text-red-700 border-red-200',
        'Análisis a automatizar': 'bg-amber-100 text-amber-700 border-amber-200'
    };

    if (vistaActual.tipo === 'dashboard') {
        return (
            <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
                <Dashboard 
                    funcionalidades={funcionalidades} 
                    onSelect={(id) => setVistaActual({ tipo: 'operaciones', funcId: id })} 
                    onCrear={manejarCrearFuncionalidad}
                />
            </div>
        );
    }

    const funcSeleccionada = funcionalidades.find(f => f.id === vistaActual.funcId);

return (
        <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
            <VistaOperaciones 
                funcionalidad={funcSeleccionada} 
                onBack={() => setVistaActual({ tipo: 'dashboard', funcId: null })}
                estilosEstado={estilosEstado}
                onActualizarEstadisticas={cargarFuncionalidades} // CONECTAMOS EL CABLE AQUÍ
            />
        </div>
    );
}