const siiauAPI = require('../api');
const scraper = require('./scrapers');

const getAcademicTermsAndCampus = async () => {
	try {
		const [academicTermsHTML, campusHTML] = await Promise.all([
			siiauAPI.get('sspseca.forma_consulta').then((res) => res.data),
			siiauAPI.get('scpcata.xcampus').then((res) => res.data),
		]);

		const academicTerms = scraper.getAcademicTermsFromHTML(academicTermsHTML);
		const campus = scraper.getCampusFromHTML(campusHTML);

		return { data: { academicTerms, campus }, error: null };
	} catch (error) {
		return { data: null, error };
	}
};

const getMajorsByCampus = async (campusCode = '') => {
	try {
		if (campusCode === '')
			return { data: null, error: 'Campus code is required' };

		const majorsByCampusHTML = await siiauAPI
			.get('sspseca.lista_carreras', {
				params: {
					cup: encodeURI(campusCode), // Campus
				},
			})
			.then((res) => res.data);

		const majorsByCampus =
			scraper.getMajorsByCampusFromHTML(majorsByCampusHTML);

		return { data: majorsByCampus, error: null };
	} catch (error) {
		return { data: null, error };
	}
};

const getCoursesByCampus = async (campusCode = '') => {
	try {
		if (campusCode === '')
			return { data: null, error: 'Campus code is required' };

		const coursesByCampusCsvString = await siiauAPI
			.get('scpcata.cataxcu', {
				params: {
					cup: encodeURI(campusCode),
					planp: 'Y', // All academic plans
					ordenp: '3', // Ordered by course name
					mostrarp: '500', // Limit really doesn't work with CSV response (returns all), but still, param is needed
					tipop: 'D', // Response type CSV
				},
			})
			.then((res) => res.data);

		const coursesByCampus = await scraper.getCoursesByCampusFromCsvString(
			coursesByCampusCsvString
		);

		return { data: coursesByCampus, error: null };
	} catch (error) {
		return { data: null, error };
	}
};

const getAcademicOffer = async (config = {}) => {
	try {
		const { academicTerm = '', campusCode = '', courseCode = '' } = config;

		if (academicTerm === '' || campusCode === '' || courseCode === '')
			return {
				data: null,
				error:
					'Config parameters required: [academicTerm, campusCode, courseCode]',
			};

		const academicOfferHTML = await siiauAPI
			.get('sspseca.consulta_oferta', {
				params: {
					ciclop: encodeURI(academicTerm),
					cup: encodeURI(campusCode),
					crsep: encodeURI(courseCode),
					ordenp: '0', // Ordered by course name
					mostrarp: '500', // Limit
				},
			})
			.then((res) => res.data);

		const academicOffer = scraper.getAcademicOfferFromHTML(academicOfferHTML);

		return { data: academicOffer, error: null };
	} catch (error) {
		return { data: null, error };
	}
};

module.exports = {
	getAcademicTermsAndCampus,
	getMajorsByCampus,
	getCoursesByCampus,
	getAcademicOffer,
};
