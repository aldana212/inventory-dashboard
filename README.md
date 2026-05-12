# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# -----------------------------------------------------

# 📦 Inventory Dashboard Frontend

Frontend SaaS del sistema de gestión de inventario con control de acceso basado en roles.

Consume una API backend y gestiona usuarios, productos, categorías y movimientos de inventario.

---

# 🧠 Descripción general

Aplicación frontend desarrollada en React para la gestión de inventario empresarial.

Incluye:

- Autenticación de usuarios con JWT
- Sistema de roles
- Rutas protegidas
- Control de permisos por página y acción
- Dashboard con métricas y gráficos
- Gestión completa de inventario
- Experiencia tipo SaaS profesional

---

# 🛠️ Stack tecnológico

- React
- React Router DOM
- Axios
- Tailwind CSS
- Recharts (gráficas)
- Zod (validación de esquemas)
- Zustand (estado global ligero)
- @tanstack/react-query (data fetching y cache)
- @tanstack/react-table (tablas avanzadas)
- react-hook-form (formularios optimizados)

---

# 🔐 Autenticación

- Login con JWT
- Persistencia de sesión
- Protección de rutas privadas
- Redirección automática si no hay sesión activa

---

# 🧩 Sistema de roles (RBAC)

El sistema cuenta con los siguientes roles:

- ADMIN → acceso total
- SUPERVISOR → gestión operativa
- OPERADOR → registro de movimientos
- VIEWER → solo lectura

---

# 🚦 Protección de rutas

Se utilizan dos capas de protección:

- ProtectedRoute → valida autenticación
- RequireRole → valida permisos por rol

---

# 📌 Acceso por módulos

## 🔐 Autenticación
- /auth/login
- /auth/change-temporary-password

Acceso: público / autenticado

---

## 📊 Dashboard
- /

Acceso: todos los usuarios autenticados

---

## 📦 Productos
- /products
- /products/:id

Acceso:
ADMIN, SUPERVISOR, OPERADOR, VIEWER

---

## ✏️ Crear / editar productos
- /products/new
- /products/:id/edit

Acceso:
ADMIN, SUPERVISOR

---

## 🔄 Movimientos
- /movements
- /movements/:type/new

Acceso:
ADMIN, SUPERVISOR, OPERADOR

---

## 👥 Usuarios
- /users

Acceso:
ADMIN, SUPERVISOR

---

## 🏷️ Categorías
- /category

Acceso:
ADMIN, SUPERVISOR, OPERADOR, VIEWER

---

## ⚙️ Settings
- /settings

Acceso: usuarios autenticados

---

# 🔒 Control de permisos interno

Además de rutas protegidas:

- botones bloqueados según rol
- acciones restringidas (crear, editar, eliminar)
- validación antes de ejecutar acciones
- UI adaptativa según permisos

---

# 📊 Dashboard

Incluye:

- gráficos de movimientos (Recharts)
- actividad reciente

---

# 🧠 Arquitectura del frontend

- Componentes reutilizables
- Rutas protegidas
- Estado global con Zustand
- Caché y sincronización con React Query
- Formularios controlados con React Hook Form
- Validación con Zod
- Tablas avanzadas con React Table
- Consumo centralizado de API

---

# 🔗 Backend

Este frontend consume un backend separado:

- API REST con Node.js + Express
- autenticación JWT
- sistema multi-tenant SaaS

---

# 🚀 Instalación

npm install  
npm run dev  

---

# 🌱 Demo

Usuarios:

admin@demo.com  
supervisor@demo.com  
operador@demo.com  
viewer@demo.com  

Password:
Demo@123

---

# 🌐 Variables de entorno

VITE_API_URL=http://localhost:3000/api  

---

# 🚀 Objetivo del proyecto

Este frontend forma parte de un sistema SaaS real de gestión de inventario con control de acceso por roles, simulando una aplicación empresarial en producción.