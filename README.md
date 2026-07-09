# Nexus Gaming - SPA de Equipamiento Gamer

Este proyecto corresponde a la **Evaluación 3 de Front End**. Se desarrolló como una **Single Page Application (SPA)** usando **React** y **Vite**, tomando como base la temática de **Nexus Gaming** de la evaluación anterior.

La aplicación simula una tienda de hardware y periféricos para gamers, con un diseño moderno y funciones que cumplen con los requisitos de la evaluación.

## Funcionalidades implementadas

* La aplicación fue desarrollada con **React** y organizada en componentes reutilizables como el **Header**, **Catálogo**, **Carrito**, **Formulario**, **Modal de productos**, **Testimonios**, **Preferencias** y **Footer**.
* Se consumen dos APIs usando **fetch**, **async/await** y **try/catch**:

  * Una API local para cargar los productos.
  * La API de **Random User** para mostrar testimonios.
* Se utilizaron los Hooks **useState**, **useEffect** y **useMemo** para manejar estados, cargar datos, guardar preferencias y optimizar el filtrado de productos.
* El carrito y las preferencias del usuario se guardan en **LocalStorage**, mientras que el nombre, tema y moneda se almacenan en **cookies** si el usuario las acepta.
* El repositorio utiliza **Conventional Commits** para mantener un historial de cambios ordenado.

## Cómo ejecutar el proyecto

Primero instala las dependencias:

```bash
npm install
```

Luego inicia el servidor de desarrollo:

```bash
npm run dev
```

Finalmente abre el navegador en:

```
http://localhost:5173
```

Si quieres generar la versión para producción, ejecuta:

```bash
npm run build
```

## Formulario

El formulario tiene cuatro campos: nombre, correo, teléfono y mensaje, todos con validaciones.

Al enviarlo:

* Se validan los datos.
* Se guarda el nombre del usuario.
* Se descarga automáticamente un archivo **CSV** con la información ingresada.
* Se muestra la alerta **"formulario enviado"**.
