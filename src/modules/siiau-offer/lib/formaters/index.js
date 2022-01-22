// Transforms '202210 - Calendario 22 A' into 'Calendario 22 A'
const formatAcademicTermName = (str) => {
	const [, formatedString] = str.trim().replace('\n', '').split('- ');

	return formatedString;
};

// Transforms '1700-1855' into {start: '17:00', end: '18:55'}
const formatScheduleTime = (str) => {
	const [startStr, endStr] = str.trim().replace('\n', '').split('-');

	const start = startStr.slice(0, 2) + ':' + startStr.slice(2);
	const end = endStr.slice(0, 2) + ':' + endStr.slice(2);

	return { start, end };
};

// Transforms '.M.J..' into ['M','J']
const formatScheduleDays = (str) => {
	const daysString = str.replace(/[^a-z]/gi, '');

	return Array.from(daysString);
};

module.exports = {
	formatAcademicTermName,
	formatScheduleTime,
	formatScheduleDays,
};
