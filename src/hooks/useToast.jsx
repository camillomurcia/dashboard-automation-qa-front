import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (toast) => {
        const id = Date.now() + Math.random();
        const newToast = { id, ...toast };
        setToasts(prev => [...prev, newToast]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const showSuccess = (title, message = '', duration = 4000) => {
        addToast({ type: 'success', title, message, duration });
    };

    const showError = (title, message = '', duration = 5000) => {
        addToast({ type: 'error', title, message, duration });
    };

    const showWarning = (title, message = '', duration = 4000) => {
        addToast({ type: 'warning', title, message, duration });
    };

    const showInfo = (title, message = '', duration = 4000) => {
        addToast({ type: 'info', title, message, duration });
    };

    return (
        <ToastContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
            {children}
            
            {/* Contenedor de toasts */}
            <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
                <div className="pointer-events-auto">
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id}
                            toast={toast}
                            onRemove={removeToast}
                        />
                    ))}
                </div>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast debe usarse dentro de ToastProvider');
    }
    return context;
};