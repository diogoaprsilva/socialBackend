const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getHelpAndSupport = async() => {
    let sql = `SELECT id, helpAndSupportContent FROM helpSupport WHERE 1`;
    const [result] = await promisePool.query(sql);
    return result;
};

exports.getHelpAndSupportById = async(id) => {
    let sql = `SELECT id, helpAndSupportContent FROM helpSupport WHERE id= ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result;
};

exports.updateHelpAndSupport = async(helpAndSupportContent, id) => {
    let sql = `UPDATE helpSupport SET helpAndSupportContent = ? WHERE id= ?`;
    const [result] = await promisePool.query(sql, [helpAndSupportContent, id]);
    return result
}


