const cheerio = require('cheerio');
const csv = require('csvtojson');

const formater = require('../formaters');

const getAcademicTermsFromHTML = (html) => {
	const academicTerms = [];
	const $ = cheerio.load(html);

	$('select[name=ciclop]')
		.children('option')
		.each((i, e) => {
			let name = $(e).text();
			name = formater.formatAcademicTermName(name);

			let code = $(e).val();

			academicTerms.push({ code, name });
		});

	return academicTerms;
};

const getCampusFromHTML = (html) => {
	const campus = [];
	const $ = cheerio.load(html);

	$('select[name=cup]')
		.children('option')
		.each((i, e) => {
			let name = $(e).text().trim().replace('\n', '');
			let code = $(e).val();

			campus.push({ code, name });
		});

	return campus;
};

const getMajorsByCampusFromHTML = (html) => {
	const majors = [];
	const $ = cheerio.load(html);

	// Select table body, then all table rows
	$('body > table:nth-child(4) > tbody')
		.children('tr')
		.each((i, e) => {
			let major = {};
			$(e)
				.children('td')
				.each((i, e) => {
					if (i === 0) {
						major.code = $(e).text();
					} else {
						major.name = $(e).text();
						majors.push(major);
					}
				});
		});

	return majors;
};

const getCoursesByCampusFromCsvString = async (csvString) => {
	const courses = [];
	const indexedCodes = [];

	const safeCsvString = csvString.replace('<BR>', '');

	await csv({
		noheader: false,
		trim: true,
		headers: [
			'deptCode',
			'deptName',
			'area',
			'courseCode',
			'courseName',
			'credits',
			'theoricHours',
			'practiceHours',
			'type',
			'level',
			'requirements',
			'corequirements',
			'majors',
		],
	})
		.fromString(safeCsvString)
		.then((coursesArr) =>
			coursesArr.forEach((course) => {
				const { courseCode, courseName } = course;
				if (courseCode === undefined || courseName === undefined) return;

				if (!indexedCodes.includes(courseCode)) {
					courses.push({
						code: courseCode.trim().replace('\n', ''),
						name: courseName.trim().replace('\n', ''),
					});
					indexedCodes.push(courseCode);
				}
			})
		);

	return courses;
};

const getAcademicOfferFromHTML = (html) => {
	const academicOffer = [];
	const $ = cheerio.load(html);

	// Select table body, then all table rows
	$('body > table:nth-child(4) > tbody')
		.children('tr')
		.has($('td'))
		.each((i, e) => {
			let course = {};

			course.nrc = $(e).children('td:nth-child(1)').text();
			course.code = $(e).children('td:nth-child(2)').text();
			course.name = $(e).children('td:nth-child(3)').text();
			course.section = $(e).children('td:nth-child(4)').text();
			course.credits = $(e).children('td:nth-child(5)').text();
			course.totalSeats = $(e).children('td:nth-child(6)').text();
			course.availableSeats = $(e).children('td:nth-child(7)').text();

			// Nested table for course schedule
			course.schedule = [];

			const scheduleTableRows = $(e)
				.children('td:nth-child(8)')
				.children('table')
				.children('tbody')
				.children('tr');

			scheduleTableRows.each((i, e) => {
				let schedule = {};

				schedule.sessions = $(e).children('td:nth-child(1)').text();

				const timeString = $(e).children('td:nth-child(2)').text();
				const { start, end } = formater.formatScheduleTime(timeString);
				schedule.time = { start, end };

				const daysString = $(e).children('td:nth-child(3)').text();
				const days = formater.formatScheduleDays(daysString);
				schedule.days = days;

				schedule.building = $(e).children('td:nth-child(4)').text();
				schedule.room = $(e).children('td:nth-child(5)').text();
				schedule.period = $(e).children('td:nth-child(6)').text();

				course.schedule.push(schedule);
			});

			course.teacher = $(
				`body > table:nth-child(4) > tbody > tr:nth-child(${
					i + 3
				}) > td:nth-child(9) > table > tbody > tr > td:nth-child(2)`
			).text();

			academicOffer.push(course);
		});
	return academicOffer;
};

module.exports = {
	getAcademicTermsFromHTML,
	getCampusFromHTML,
	getMajorsByCampusFromHTML,
	getCoursesByCampusFromCsvString,
	getAcademicOfferFromHTML,
};
