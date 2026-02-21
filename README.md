# Dashboard QA Automation — Frontend

Panel de control (dashboard) para la gestión y seguimiento del progreso de automatización de pruebas (QA). Permite visualizar, crear y editar las operaciones de cada módulo funcional, mostrando métricas en tiempo real sobre cuántos escenarios de prueba están automatizados, son manuales o están pendientes de análisis.

---

## 🚀 Tecnologías utilizadas

| Tecnología | Versión | Descripción |
|---|---|---|
| [React](https://react.dev/) | 19 | Librería de UI |
| [Vite](https://vite.dev/) | 7 | Bundler y servidor de desarrollo |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos utilitarios |
| [Lucide React](https://lucide.dev/) | — | Íconos |
| [ESLint](https://eslint.org/) | 10 | Linter de código |

---

## ✨ Funcionalidades

- **Dashboard principal:** visualización de todas las funcionalidades del proyecto como tarjetas interactivas.
- **Vista de operaciones:** al seleccionar una funcionalidad, se muestra una tabla detallada con todas sus operaciones, incluyendo:
  - Total de escenarios de prueba.
  - Cantidad de escenarios automatizados y manuales.
  - Barra de progreso de automatización por operación.
  - Estado calculado automáticamente: `Manual`, `Parcial`, `Completado`.
  - Opción de forzar el estado manualmente: `No automatizable`, `Análisis a automatizar`.
- **Métricas globales:** gráfico circular (donut) y tarjetas con el porcentaje total de automatización de la funcionalidad seleccionada.
- **Modal de creación/edición:** formulario emergente para crear nuevas operaciones o editar las existentes.
- **Diseño responsivo:** adaptado para pantallas móviles y de escritorio.

---

## 📁 Estructura del proyecto

```
src/
├── assets/             # Recursos estáticos (imágenes, íconos, etc.)
├── components/
│   └── ModalOperacion.jsx   # Modal reutilizable para crear/editar operaciones
├── pages/
│   ├── Dashboard.jsx        # Vista principal con la grilla de funcionalidades
│   └── VistaOperaciones.jsx # Vista de detalle con tabla de operaciones y métricas
├── App.jsx             # Componente raíz y enrutador casero
├── index.css           # Estilos globales (Tailwind)
└── main.jsx            # Punto de entrada de la aplicación
```

---

## 🛠️ Instalación y uso

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (incluido con Node.js)

### Pasos

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/camillomurcia/dashboard-automation-qa-front.git
   cd dashboard-automation-qa-front
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`.

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con Hot Module Replacement (HMR) |
| `npm run build` | Genera los archivos optimizados para producción en la carpeta `dist/` |
| `npm run preview` | Sirve localmente el build de producción para su revisión |
| `npm run lint` | Ejecuta ESLint para verificar el estilo y calidad del código |

---

## 🗺️ Roadmap

- [ ] Integración con API REST en Java (Spring Boot) para persistir los datos.
- [ ] Autenticación de usuarios.
- [ ] Soporte para múltiples proyectos.
- [ ] Exportación de reportes (PDF / Excel).
- [ ] Filtros y búsqueda en la tabla de operaciones.
