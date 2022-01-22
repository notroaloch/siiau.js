const cheerio = require('cheerio');

const getLoginStatusFromHTML = (html) => {
	const $ = cheerio.load(html);

	// Search for invalid login text message
	const messageIndicator = $('body').find('strong').length;
	if (messageIndicator !== 0) {
		return 401;
	}

	return 200;
};

const getStudentInfoFromHTML = (html) => {
	let studentInfo = {};
	const $ = cheerio.load(html);

	const baseURL = 'http://siau4.siiau.udg.mx/siiaun';

	studentInfo.code = $(
		'body > form > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)'
	).text();

	studentInfo.name = $(
		'body > form > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(2)'
	).text();

	studentInfo.genre = $(
		'body > form > table:nth-child(2) > tbody > tr:nth-child(5) > td:nth-child(2)'
	).text();

	studentInfo.birthDate = $(
		'body > form > table:nth-child(2) > tbody > tr:nth-child(6) > td:nth-child(2)'
	).text();

	studentInfo.curp = $(
		'body > form > table:nth-child(2) > tbody > tr:nth-child(6) > td:nth-child(4)'
	).text();

	studentInfo.email = $(
		'body > form > table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(2)'
	).text();

	const relativeProfile = $(
		'body > form > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1) > img'
	).attr('src');
	studentInfo.profilePictureUrl = relativeProfile.replace('..', baseURL);

	const relativeSignature = $(
		'body > form > table:nth-child(4) > tbody > tr:nth-child(7) > td:nth-child(2) > img'
	).attr('src');
	studentInfo.signatureUrl = relativeSignature.replace('..', baseURL);

	return studentInfo;
};

module.exports = { getLoginStatusFromHTML, getStudentInfoFromHTML };
