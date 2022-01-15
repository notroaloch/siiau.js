// Transforms '202210 - Calendario 22 A' into 'Calendario 22 A'
const formatAcademicTermName = (str) => {
	const [, formatedString] = str.trim().replace('\n', '').split('- ');

	return formatedString;
};

module.exports = { formatAcademicTermName };
