# Proyecto Monitoreo Ambiental IPv6

## Descripción
Sistema de monitoreo ambiental basado en placas Arduino que miden temperatura y humedad mediante sensores DHT11. Los datos se transmiten a través de una red IPv6 a un servidor Node.js que procesa y visualiza la información en tiempo real mediante una aplicación web.

## Funcionalidades
- Captura de datos de temperatura y humedad con Arduino y DHT11.
- Comunicación entre Arduino y servidor usando IPv6.
- Servidor backend en Node.js con Express y Socket.IO.
- Visualización en tiempo real con gráficos interactivos usando Chart.js.
- Historial de datos almacenados temporalmente para análisis.

## Configuración de la Red IPv6
- Dirección IPv6 del servidor: `2803:d100:9840:1db8:5436:ec34:f05f:80ea`
- Arduino debe usar una dirección IPv6 compatible dentro del mismo prefijo.
- Red configurada para permitir comunicación IPv6 entre dispositivos.

## Estructura del Proyecto
- `/arduino` Código fuente para las placas Arduino.
- `/public` Archivos estáticos para la aplicación web (HTML, JS, CSS).
- `server.js` Código del servidor Node.js.
- `package.json` y `package-lock.json` para dependencias.

## Requisitos
- Arduino con Ethernet Shield (IPv6 compatible o usando túnel).
- Node.js instalado (v14 o superior recomendado).
- Librería ArduinoJson para Arduino IDE.
- Red IPv6 configurada y funcional.

## Instalación y Uso
1. Configurar red IPv6 y asignar direcciones a Arduino y servidor.
2. Cargar código Arduino con la configuración adecuada.
3. En la carpeta del proyecto, instalar dependencias con:
   ```bash
   npm install
