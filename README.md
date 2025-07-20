# 🐾 Clínica Veterinaria - Sistema de Gestión

Sistema web completo para la gestión de una clínica veterinaria desarrollado con **React + Vite**. Permite administrar dueños, mascotas, veterinarios y reservas de procedimientos médicos.

## ✨ Características

- 📊 **Dashboard** con estadísticas en tiempo real
- 👥 **Gestión de Dueños** - CRUD completo con validaciones
- 🐕 **Gestión de Mascotas** - Registro vinculado a dueños
- 👨‍⚕️ **Gestión de Veterinarios** - Control del personal médico
- 📅 **Sistema de Reservas** - Programación de citas y procedimientos
- 🎨 **Diseño Responsive** - Optimizado para móvil, tablet y escritorio
- 🔄 **API REST** - Conexión con backend para persistencia de datos

## 🚀 Tecnologías Utilizadas

- **Frontend:** React 19.1.0 + Vite 7.0.4
- **Routing:** React Router DOM 6.28.0
- **HTTP Client:** Axios 1.6.2
- **Styling:** CSS3 con variables personalizadas
- **Linting:** ESLint con configuración para React

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Backend API ejecutándose en `http://67.205.142.104:3000/api`

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone git@github.com:TU_USUARIO/clinica-veterinaria-react.git
cd clinica-veterinaria-react
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Navegación principal
│   └── Header.css      # Estilos del header
├── pages/              # Páginas principales
│   ├── Dashboard.jsx   # Panel de control
│   ├── DuenosList.jsx  # Gestión de dueños
│   ├── MascotasList.jsx # Gestión de mascotas
│   ├── VeterinariosList.jsx # Gestión de veterinarios
│   └── ReservasList.jsx # Gestión de reservas
├── services/           # Servicios de API
│   └── api.js         # Configuración de Axios y endpoints
├── App.jsx            # Componente principal
├── main.jsx          # Punto de entrada
└── index.css         # Estilos globales
```

## 🎨 Paleta de Colores

- **Verde Primario:** `#28a745`
- **Verde Oscuro:** `#1e7e34`
- **Verde Claro:** `#d4edda`
- **Verde Secundario:** `#20c997`
- **Verde Acento:** `#6f9654`
- **Blanco:** `#ffffff`
- **Gris Claro:** `#f8f9fa`

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
```

## 📱 Funcionalidades por Módulo

### Dashboard
- Estadísticas de registros totales
- Accesos rápidos a cada módulo
- Interfaz intuitiva con iconos

### Gestión de Dueños
- Registro con validación de RUT
- Campos: Nombre, RUT, Teléfono, Email
- Edición y eliminación de registros

### Gestión de Mascotas
- Vinculación automática con dueños
- Campos: Nombre, Tipo, Edad, Raza, Dueño
- Validaciones de campos obligatorios

### Gestión de Veterinarios
- Control del personal médico
- Campos: Nombre, Especialidad, Teléfono
- CRUD completo

### Sistema de Reservas
- Selects dinámicos con datos reales
- Vinculación: Mascota → Dueño → Veterinario
- Gestión de fechas y procedimientos

## 🌐 API Endpoints

```javascript
// Dueños
GET    /api/dueno
POST   /api/dueno
PUT    /api/dueno/:id
DELETE /api/dueno/:id

// Mascotas
GET    /api/mascota
POST   /api/mascota
PUT    /api/mascota/:id
DELETE /api/mascota/:id

// Veterinarios
GET    /api/veterinario
POST   /api/veterinario
PUT    /api/veterinario/:id
DELETE /api/veterinario/:id

// Reservas
GET    /api/reserva
POST   /api/reserva
PUT    /api/reserva/:id
DELETE /api/reserva/:id
```

## 📱 Responsive Design

- **Desktop:** Diseño completo con sidebar y tablas
- **Tablet:** Adaptación de navegación y formularios
- **Mobile:** Navegación colapsable y tablas scrolleables

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [Juandelsur](https://github.com/Juandelsur)
- Email: juan.munoz6895@egmail.com

## 🙏 Agradecimientos

- React Team por el excelente framework
- Vite por la herramienta de build ultrarrápida
- Iconos emoji para la interfaz amigable

---

⭐ **¡Dale una estrella si te gustó el proyecto!** ⭐
