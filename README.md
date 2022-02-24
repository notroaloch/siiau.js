# siiau.js

![npm (scoped)](https://img.shields.io/npm/v/@notroaloch/siiau.js) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@notroaloch/siiau.js) ![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@notroaloch/siiau.js) ![NPM](https://img.shields.io/npm/l/@notroaloch/siiau.js)

Librería para la consulta de información de SIIAU

## Instalación

```
npm install @notroaloch/siiau.js
```

## Importación y Uso

```
const SiiauJs = require('@notroaloch/siiau.js')

const res = await SiiauJs.getAcademicTermsAndCampus();
```

## API

La documentación y ejemplos de uso se pueden encontrar en el archivo [DOCS](https://github.com/notroaloch/siiau.js/blob/main/DOCS.md)

## Live Demo

Este paquete es usado en el backend de la plataforma [siiau.js](https://siiaujs.roaloch.xyz/home). Esta página genera horarios para la Universidad de Guadalajara, utilizando las funciones de consulta de oferta académica de esta librería.

## Licencia

siiau.js es un proyecto bajo una [licencia MIT](https://github.com/notroaloch/siiau.js/blob/main/LICENSE.md)

## Avisos

- siiau.js es una librería abierta sin ninguna relación con la Universidad de Guadalajara
- La disponibilidad de la librería depende directamente de los servidores SIIAU
- El uso que se le de a la librería es responsabilidad de cada desarrollador
- Las peticiones http se realizan directamente a los servidores SIIAU
- La información es recolectada mediante web scraping
