import React from 'react';

// Skeleton básico reutilizable
export const Skeleton = ({ className = "", children }) => (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`}>
        {children}
    </div>
);

// Skeleton para tarjetas del dashboard
export const SkeletonCard = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <Skeleton className="w-12 h-12 rounded-xl mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
    </div>
);

// Skeleton para métricas (tarjetas de estadísticas)
export const SkeletonMetric = () => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-2">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-16" />
    </div>
);

// Skeleton para el gráfico circular
export const SkeletonCircularChart = () => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center gap-4">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-5 w-24" />
        </div>
    </div>
);

// Skeleton para filas de tabla
export const SkeletonTableRow = () => (
    <tr className="border-b border-slate-100">
        <td className="p-5"><Skeleton className="h-4 w-32" /></td>
        <td className="p-5 text-center"><Skeleton className="h-4 w-8 mx-auto" /></td>
        <td className="p-5 text-center"><Skeleton className="h-4 w-8 mx-auto" /></td>
        <td className="p-5 text-center"><Skeleton className="h-4 w-8 mx-auto" /></td>
        <td className="p-5">
            <div className="flex items-center gap-3">
                <Skeleton className="h-2.5 w-full rounded-full" />
                <Skeleton className="h-3 w-8" />
            </div>
        </td>
        <td className="p-5"><Skeleton className="h-6 w-20 rounded-full" /></td>
        <td className="p-5 text-right"><Skeleton className="h-8 w-8 rounded-lg ml-auto" /></td>
    </tr>
);