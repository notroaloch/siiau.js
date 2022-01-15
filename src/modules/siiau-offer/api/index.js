const axios = require('axios').default;

// Academic terms, campus and academic offer
const siiauAPI = axios.create({
	baseURL: 'http://consulta.siiau.udg.mx/wco/',
});

module.exports = siiauAPI;
