# ⚡ Nexus Gaming - SPA de Equipamiento Gamer (Evaluación 3 - Front End)

Este proyecto corresponde a la **Evaluación 3 de Front End**. Consiste en una aplicación de página única (SPA) desarrollada sobre **React** utilizando **Vite** para la automatización del entorno de desarrollo. 

La aplicación adopta y expande la temática corregida de la **Evaluación 2 (Nexus Gaming)**, ofreciendo un catálogo de hardware y periféricos para gamers con una interfaz estética premium (Glassmorphism con acentos neón y transiciones fluidas), y cumpliendo con todas las exigencias de la pauta de evaluación.

---

## 📋 Requerimientos Evaluados y Logrados

### 1) Uso de la Librería React (10 Puntos)
- El proyecto está estructurado como una Single Page Application (SPA) sobre React 19 y empaquetada mediante Vite para un rendimiento ultrarrápido y soporte de módulos ES.

### 2) Codificación Basada en Componentes (20 Puntos)
El código se encuentra modularizado en componentes reutilizables y con responsabilidades bien definidas dentro del directorio `src/components/`:
- `Header`: Barra de navegación, buscador reactivo, perfil y botón de carrito.
- `Hero`: Portada interactiva con transiciones de entrada y llamados a la acción.
- `Catalog`: Contenedor inteligente del catálogo. Realiza la carga de datos y aplica filtros avanzados.
- `ProductCard`: Tarjeta interactiva individual de producto con animaciones hover y conversión de divisa.
- `ProductModal`: Ventana emergente con especificaciones técnicas detalladas y botón para agregar al carro.
- `Cart`: Desplegable (drawer) lateral del carrito, cálculo de sumatorias y exportación de cotizaciones.
- `Testimonials`: Sección dinámica de comentarios de usuarios.
- `ContactForm`: Formulario de contacto interactivo de 4 campos.
- `PreferencesPanel`: Configuración de cuenta y personalización de la experiencia.
- `CookieBanner`: Banner de consentimiento de privacidad de cookies.
- `Footer`: Pie de página informativo con la firma y el contacto del alumno.

### 3) Uso de API (Consumo), Fetch, Async y Await (30 Puntos)
El proyecto realiza peticiones asíncronas para el consumo de dos fuentes de datos distintas usando bloques `try/catch`:
1. **API Local de Productos (`/api/products.json`)**: Consume un catálogo propio de periféricos Nexus (Mouses, Teclados, Audífonos, Sillas) con especificaciones y precios reales.
2. **API Externa de Usuarios (`https://randomuser.me/api/?results=3`)**: Obtiene de manera dinámica fotografías, nombres y países de usuarios reales de internet para popularizar la sección de testimonios de la comunidad gaming.

### 4) Uso de React Hooks (useState, useMemo, useEffect) (30 Puntos)
- **`useState`**: Controla estados interactivos locales y globales:
  - Búsqueda (`searchQuery`) y carrito de compras (`cartItems`).
  - Visibilidad de modales (`prefOpen`, `cartOpen`, `activeProduct`).
  - Preferencias personales (`userName`, `theme`, `currency`).
  - Estados de consumo asíncrono (`loading`, `error`).
- **`useMemo`**: Optimiza cálculos y filtros evitando renders innecesarios:
  - Búsqueda y filtrado de periféricos en tiempo real según la categoría seleccionada y la cadena de texto de búsqueda.
  - Cálculo dinámico de la suma total de productos en el carrito de compras.
- **`useEffect`**: Maneja efectos secundarios y ciclo de vida de componentes:
  - Carga asíncrona de datos en catálogo y testimonios al momento de montarse el componente.
  - Sincronización del tema visual claro/oscuro en el DOM de la aplicación.
  - Guardado automático y lectura del carrito de compras y preferencias de usuario.

### 5) README Explicativo (10 Puntos)
- El presente documento detalla la estructura, requerimientos y comandos del proyecto.

### 6) Puntos Extras: LocalStorage y Cookies (20 Puntos)
- **LocalStorage**: Almacena de manera local la configuración del carrito de compras y las preferencias generales para que no se pierdan al refrescar el navegador.
- **Cookies**: La información del nombre de usuario, el tema visual activo (oscuro/claro) y la divisa seleccionada (CLP/USD) se guardan en las cookies del navegador.
- **Gestión de Consentimiento**: Se implementó un Banner de Cookies interactivo que permite aceptar o rechazar el guardado de cookies, respetando la privacidad del usuario.

### 7) Puntos Extras: Conventional Commits (10 Puntos)
- El repositorio git local ha sido documentado utilizando la especificación de [Conventional Commits](https://www.conventionalcommits.org/). El historial de commits incluye prefijos claros (`feat:`, `docs:`, `chore:`, `style:`) describiendo los cambios arquitectónicos paso a paso.

---

## 🚀 Instrucciones para Ejecutar el Proyecto

### Requisitos Previos
- Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

### Pasos de Instalación y Ejecución

1. **Instalar Dependencias**
   ```bash
   npm install
   ```

2. **Iniciar el Servidor de Desarrollo**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para interactuar con la aplicación.

3. **Construir para Producción**
   Para compilar el código optimizado y minificado listo para producción:
   ```bash
   npm run build
   ```

---

## 🛠️ Temática del Formulario y Exportación de Datos (Satisfaciendo Ev. 2)
El formulario de contacto de 4 campos cuenta con las siguientes validaciones en tiempo real:
- **Nombre Completo**: Requerido, sólo letras y espacios (coincide con su etiqueta).
- **Correo Electrónico**: Requerido, formato estándar con `@` y dominio (coincide con su etiqueta).
- **Teléfono**: Requerido, exactamente 9 dígitos numéricos (coincide con su etiqueta).
- **Mensaje**: Requerido, al menos 5 caracteres (coincide con su etiqueta).

Al presionar **Enviar Mensaje**:
1. Valida el formato y concordancia de todos los campos.
2. Almacena el nombre del remitente en el estado global (guardándolo automáticamente en cookies y localStorage).
3. Genera y descarga de forma automática un archivo `.csv` con los datos ingresados en el formulario.
4. Lanza la alerta nativa requerida: `formulario enviado`.
