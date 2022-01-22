const { siiau4API } = require('../api');
const scraper = require('./scrapers');

const loginSiiau4 = async ({ studentCode, password }) => {
	const loginHTML = await siiau4API
		.post('Login.jsp?', null, {
			params: {
				UserName: encodeURI(studentCode),
				psw: password,
			},
		})
		.then((res) => res.data);

	const loginStatus = scraper.getLoginStatusFromHTML(loginHTML);
	return loginStatus;
};

const getStudentInfo = async (config = {}) => {
	try {
		const { studentCode = '', password = '' } = config;

		if (studentCode === '' || password === '')
			return {
				data: null,
				error: 'Config parameters required: [studentCode, password]',
			};

		const loginStatus = await loginSiiau4(config);

		if (loginStatus !== 200)
			return { data: null, error: 'Invalid login credentials' };

		const studentInfoHTML = await siiau4API
			.get('EVALUMGEN/vista.jsp')
			.then((res) => res.data);

		const studentInfo = scraper.getStudentInfoFromHTML(studentInfoHTML);

		return { data: { basicInfo: studentInfo }, error: null };
	} catch (error) {
		return { data: null, error };
	}
};

module.exports = { getStudentInfo };
