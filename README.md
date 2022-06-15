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

## Documentación de API

### getAcademicTermsAndCampus()

Obtiene los ciclos escolares y los centros universitarios de la red UdeG

```
const res = await SiiauJs.getAcademicTermsAndCampus();

res => {
    data: {
        academicTerms: [{code, name}, ...],
        campus: [{code, name}, ...]
    },
    error: null
}
```

### getMajorsByCampus(campusCode)

Obtiene las carreras ofertadas en el centro universitario especificado

```
const res = await SiiauJs.getMajorsByCampus('D'); // D => CUCEI

res => {
    data: [{code, name},...],
    error: null
}
```

### getCoursesByCampus(campusCode)

Obtiene las materias ofertadas en el centro universitario especificado  
_NOTA: El desempeño se ve afectado debido a la naturaleza de la petición y el tiempo de respuesta del servidor SIIAU_

```
const res = await SiiauJs.getCoursesByCampus('D'); // D => CUCEI

res => {
    data: [{code, name},...],
    error: null
}
```

### getAcademicOffer(config)

Obtiene la oferta academica para los parametros especificados

```
const res = await SiiauJs.getAcademicOffer({
    academicTerm: '202210', // 202210 => CALENDARIO 2022A
    campusCode: 'D', // D => CUCEI
    courseCode: 'I5909', I5909 => PROGRAMACIÓN PARA INTERNET
});

res => {
    data: [{
        nrc,
        code,
        name,
        section,
        credits,
        totalSeats,
        availableSeats,
        schedule: [{
            sessions,
            time: {start, end},
            days,
            building,
            room,
            period
        },...],
        teacher
    },...],
    error: null
}
```

### getStudentInfo(config)

Obtiene información del estudiante

```
const res = await SiiauJs.getStudentInfo({
    studentCode: '123456789',
    password: 'secret123',
});

res => {
    data: {
        basicInfo: {
            code,
            name,
            genre,
            birthDate,
            curp,
            email,
            profilePictureUrl,
            signatureUrl
        }
    },
    error: null
}
```

## Licencia

siiau.js es un proyecto bajo una [licencia MIT](https://github.com/notroaloch/siiau.js/blob/main/LICENSE.md)

## Avisos

- siiau.js es una librería abierta sin ninguna relación con la Universidad de Guadalajara
- La disponibilidad de la librería depende directamente de los servidores SIIAU
- El uso que se le de a la librería es responsabilidad de cada desarrollador
- Las peticiones http se realizan directamente a los servidores SIIAU
- La información es recolectada mediante web scraping
