const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getTermAndConditionsData = async() => {
    let sql = `SELECT id, termsAndConditonsData FROM termsAndConditons WHERE 1`;
    const [result] = await promisePool.query(sql);
    return result;
};

exports.getTermAndConditionsDataById = async(id) => {
    let sql = `SELECT id, termsAndConditonsData FROM termsAndConditons WHERE id= ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result;
};

exports.updateTermsAndConditionDataById = async(termsAndConditonsData, id) => {
    let sql = `UPDATE termsAndConditons SET termsAndConditonsData= ? WHERE id= ?`;
    const [result] = await promisePool.query(sql, [termsAndConditonsData, id]);
    return result
}


