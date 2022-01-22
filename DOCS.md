# Documentación de API

## getAcademicTermsAndCampus()

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

## getMajorsByCampus(campusCode)

Obtiene las carreras ofertadas en el centro universitario especificado

```
const res = await SiiauJs.getMajorsByCampus('D'); // D => CUCEI

res => {
    data: [{code, name},...],
    error: null
}
```

## getCoursesByCampus(campusCode)

Obtiene las materias ofertadas en el centro universitario especificado  
_NOTA: El desempeño se ve afectado debido a la naturaleza de la petición y el tiempo de respuesta del servidor SIIAU_

```
const res = await SiiauJs.getCoursesByCampus('D'); // D => CUCEI

res => {
    data: [{code, name},...],
    error: null
}
```

## getAcademicOffer(config)

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

## getStudentInfo(config)

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
