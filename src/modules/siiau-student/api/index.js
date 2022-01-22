const axios = require('axios').default;
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

const jar = new CookieJar();

const siiau4API = wrapper(
	axios.create({
		baseURL: 'http://siau4.siiau.udg.mx/siiaun/',
		withCredentials: true,
		jar,
	})
);

module.exports = { siiau4API };
