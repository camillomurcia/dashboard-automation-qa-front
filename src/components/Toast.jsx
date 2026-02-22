import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ toast, onRemove }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(toast.id);
        }, toast.duration || 4000);

        return () => clearTimeout(timer);
    }, [toast, onRemove]);

    const getToastStyles = () => {
        const baseStyles = "transform transition-all duration-300 ease-in-out mb-4 max-w-sm w-full bg-white shadow-lg rounded-xl border-l-4 p-4 flex items-start gap-3";
        
        switch (toast.type) {
            case 'success':
                return `${baseStyles} border-l-green-500`;
            case 'error':
                return `${baseStyles} border-l-red-500`;
            case 'warning':
                return `${baseStyles} border-l-yellow-500`;
            default:
                return `${baseStyles} border-l-blue-500`;
        }
    };

    const getIcon = () => {
        const iconClass = "w-5 h-5 flex-shrink-0 mt-0.5";
        
        switch (toast.type) {
            case 'success':
                return <CheckCircle className={`${iconClass} text-green-500`} />;
            case 'error':
                return <XCircle className={`${iconClass} text-red-500`} />;
            case 'warning':
                return <AlertCircle className={`${iconClass} text-yellow-500`} />;
            default:
                return <AlertCircle className={`${iconClass} text-blue-500`} />;
        }
    };

    return (
        <div className={getToastStyles()}>
            {getIcon()}
            <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-800 mb-1">
                    {toast.title}
                </h4>
                {toast.message && (
                    <p className="text-sm text-slate-600">
                        {toast.message}
                    </p>
                )}
            </div>
            <button
                onClick={() => onRemove(toast.id)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;