const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getDashboardStatistics = async() => {
    let sql = `SELECT getTotalNumberOfSubAdmin() as totalSubAdmin, getTotalNumberOfVendor() as totalVendor, getNumberOfTeacher() as totalTeacher, getTotalNumberOfOffer() as totalOffer, getTotalNumberOfUnlockOffer() as totalUnlockOffer, getNumberOfEvents() as totalEvents, getTotalsNumberOfVerifiedTeacher() as totalVerifiedTeacher, getTotalNumberOfUnapprovedOffer() as totalUnapprovedOffer, getTotalsNumberOfUnVerifiedTeacher() as totalUnVerifiedTeacher, getTotalNUmberOfTeacherFeedBack() as teacherFeedback, getTotalNumberOfVendorFeedBack() as vendorFeedback`;
    const [result] = await promisePool.query(sql);
    return result;
}

