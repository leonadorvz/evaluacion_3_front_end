# Nexus Gaming - SPA de Equipamiento Gamer (Evaluación 3 - Front End)

Este proyecto corresponde a la **Evaluación 3 de Front End** y consiste en una **Single Page Application (SPA)** desarrollada con **React** y **Vite**. La aplicación toma como base la temática de la Evaluación 2, **Nexus Gaming**, ampliándola con un catálogo de hardware y periféricos para gamers, ofreciendo una experiencia moderna mediante una interfaz con estilo *Glassmorphism*, detalles en neón y transiciones suaves.

El proyecto fue desarrollado considerando todos los requisitos establecidos en la pauta de evaluación.

---

# Requerimientos implementados

## 1. Uso de React

La aplicación fue construida utilizando **React 19**, siguiendo la arquitectura de una SPA. El proyecto utiliza **Vite** como herramienta de desarrollo y empaquetado, permitiendo una carga rápida y una estructura moderna basada en módulos.

## 2. Desarrollo basado en componentes

La aplicación está organizada en componentes reutilizables, cada uno con una responsabilidad específica dentro del proyecto.

Los principales componentes son:

* **Header:** navegación principal, buscador, acceso al perfil y carrito de compras.
* **Hero:** portada principal con información destacada y botones de acción.
* **Catalog:** administra la carga de productos y aplica filtros de búsqueda.
* **ProductCard:** muestra la información resumida de cada producto.
* **ProductModal:** presenta los detalles completos del producto y permite agregarlo al carrito.
* **Cart:** administra los productos seleccionados, calcula el total y permite exportar una cotización.
* **Testimonials:** muestra comentarios de usuarios obtenidos desde una API.
* **ContactForm:** formulario de contacto con validaciones.
* **PreferencesPanel:** permite configurar preferencias como tema, moneda y nombre del usuario.
* **CookieBanner:** solicita el consentimiento para el uso de cookies.
* **Footer:** contiene información general del proyecto y del autor.

## 3. Consumo de APIs

El proyecto utiliza **fetch**, junto con **async/await** y manejo de errores mediante **try/catch**, para consumir dos fuentes de información.

* **API local:** `/api/products.json`, desde donde se obtiene el catálogo de productos con sus características y precios.
* **API externa:** `https://randomuser.me/api/?results=3`, utilizada para cargar automáticamente nombres, fotografías y países de usuarios en la sección de testimonios.

## 4. Uso de React Hooks

Se implementaron distintos Hooks para administrar el funcionamiento de la aplicación.

* **useState:** controla estados como el buscador, el carrito, las preferencias del usuario, la apertura de modales y los estados de carga y error.
* **useMemo:** optimiza el filtrado de productos y el cálculo del total del carrito, evitando renderizados innecesarios.
* **useEffect:** permite cargar la información al iniciar la aplicación, sincronizar el tema visual y guardar automáticamente las preferencias y el carrito.

## 5. Documentación

El proyecto incluye este archivo **README**, donde se explica la estructura general, las funcionalidades implementadas y los pasos necesarios para ejecutar la aplicación.

## 6. Funcionalidades adicionales

Como parte de los puntos extra se implementaron las siguientes características:

* **LocalStorage:** almacena el carrito de compras y las preferencias del usuario para conservar la información incluso después de actualizar la página.
* **Cookies:** guardan el nombre del usuario, el tema seleccionado y la moneda elegida.
* **Banner de consentimiento:** permite aceptar o rechazar el uso de cookies antes de almacenarlas.

## 7. Conventional Commits

El historial del repositorio fue organizado utilizando la convención **Conventional Commits**, empleando prefijos como `feat`, `docs`, `style` y `chore` para identificar claramente cada tipo de cambio realizado durante el desarrollo.

---

# Instrucciones para ejecutar el proyecto

## Requisitos

* Tener instalado **Node.js** (versión 18 o superior).

## Instalación

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Luego abrir el navegador en:

```
http://localhost:5173
```

Para generar la versión optimizada para producción:

```bash
npm run build
```

---

# Formulario de contacto

El formulario incluye cuatro campos con validaciones en tiempo real:

* **Nombre completo:** obligatorio y solo permite letras y espacios.
* **Correo electrónico:** obligatorio y con formato válido.
* **Teléfono:** obligatorio y compuesto por 9 dígitos.
* **Mensaje:** obligatorio con un mínimo de 5 caracteres.

Al enviar el formulario, la aplicación:

1. Valida que toda la información ingresada sea correcta.
2. Guarda el nombre del usuario en el estado de la aplicación, además de almacenarlo en cookies y LocalStorage.
3. Genera automáticamente un archivo **CSV** con los datos ingresados para su descarga.
4. Muestra la alerta solicitada: **"formulario enviado"**.
