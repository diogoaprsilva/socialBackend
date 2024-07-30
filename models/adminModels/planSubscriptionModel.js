const config = require('../../config');
const promisePool = require('../../utils/connection');

// exports.getPlanSubscriptionDetailsByUser = async(id) => {
//     let sql = `SELECT ps.id as planSubscriptionID, ps.cardNumber, ps.amount, ps.startTime, ps.endTime, ps.type, ps.status, date_format(date_add(ps.datetime, interval 330 minute),'%Y-%m-%d') as datetime FROM planSubscription as ps LEFT JOIN userRegistration as ur ON ps.userId = ur.id WHERE ur.id = ?`;
//     const [result] = await promisePool.query(sql,[id]);
//     return result
// }

exports.getPlanSubscriptionDetailsByUser = async(userId) => {
    let sql = `SELECT * FROM planSubscription WHERE userId = ?`;
    const [result] = await promisePool.query(sql,[userId]);
    return result
}