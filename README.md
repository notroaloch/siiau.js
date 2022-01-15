# siiau.js

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

## Licencia

siiau.js es un proyecto bajo una [licencia MIT](https://github.com/notroaloch/siiau.js/blob/main/LICENSE.md)

## Avisos

- siiau.js es una librería abierta sin ninguna relación con la Universidad de Guadalajara
- El uso que se le de a la librería es responsabilidad de cada desarrollador
- Las peticiones http se realizan directamente a los servidores SIIAU
- La información es recolectada mediante web scraping
