const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getReferralAmt = async() => {
    let sql = `SELECT id, yourAmount, friendAmount FROM referralManagement `;
    const [result] = await promisePool.query(sql,);
    return result;
};

exports.getRefferalAmtById = async(id) => {
    let sql = `SELECT id, yourAmount, friendAmount FROM referralManagement WHERE id= ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result;
};

exports.updateReferralAmt = async(yourAmount, friendAmount, id) => {
    let sql = `UPDATE referralManagement SET yourAmount = ?, friendAmount = ? WHERE id= ?`;
    const [result] = await promisePool.query(sql, [yourAmount, friendAmount, id]);
    return result
}


