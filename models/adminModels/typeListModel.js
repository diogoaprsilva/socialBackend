const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.loginTypeListDetails = async() => {
    let sql = `SELECT id, type FROM loginType where 1`;
    const [result] = await promisePool.query(sql);
    return result;
}