const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getPrivacyPolicyData = async() => {
    let sql = `SELECT id, privacyPolicyData FROM privacyPolicy WHERE 1`;
    const [result] = await promisePool.query(sql);
    return result;
};

exports.getPrivacyPolicyDataById = async(id) => {
    let sql = `SELECT id, privacyPolicyData FROM privacyPolicy WHERE id= ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result;
};


exports.updatePrivacyPolicyData = async(privacyPolicyData, id) => {
    let sql = `UPDATE privacyPolicy SET privacyPolicyData= ? WHERE id = ?`;
    const [result] = await promisePool.query(sql, [privacyPolicyData, id]);
    return result;
}