const siiauOfferModule = require('./modules/siiau-offer/lib');
const siiauStudentModule = require('./modules/siiau-student/lib');

class SiiauJs {
	static async getAcademicTermsAndCampus() {
		return await siiauOfferModule.getAcademicTermsAndCampus();
	}

	static async getMajorsByCampus(campusCode) {
		return await siiauOfferModule.getMajorsByCampus(campusCode);
	}

	static async getCoursesByCampus(campusCode) {
		return await siiauOfferModule.getCoursesByCampus(campusCode);
	}

	static async getAcademicOffer(config) {
		return await siiauOfferModule.getAcademicOffer(config);
	}

	static async getStudentInfo(config) {
		return await siiauStudentModule.getStudentInfo(config);
	}
}

module.exports = SiiauJs;
