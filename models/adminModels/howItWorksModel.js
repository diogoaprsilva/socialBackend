const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getHowItWorkDetais = async(userId) => {
    let sql = `SELECT id, userId, howItWorksPdf, date_format(date_add(datetime, interval 330 minute),'%Y-%m-%d') as datetime FROM howItWorks as hw where userId = ? ORDER BY hw.id DESC`;
    const [result] = await promisePool.query(sql, [userId]);
    return result;
};

exports.getHowItWorksDetailsForVendor = async() => {
    let sql = `SELECT id, userId, howItWorksPdf, date_format(date_add(datetime, interval 330 minute),'%Y-%m-%d') as datetime FROM howItWorks as hw ORDER BY hw.updatedDateTime DESC`;
    const [result] = await promisePool.query(sql, []);
    return result;
};

exports.getHowItWorkDetaisById = async(howItWorksId) => {
    let sql = `SELECT id, userId, howItWorksPdf, date_format(date_add(datetime, interval 330 minute),'%Y-%m-%d') as datetime FROM howItWorks WHERE id = ?`;
    const [result] = await promisePool.query(sql, [howItWorksId]);
    return result;
};

exports.getHowItWorkDetaisByPdf = async(howItWorksPdf) => {
    let sql = `SELECT userId, howItWorksPdf FROM howItWorks WHERE howItWorksPdf = ?`;
    const [result] = await promisePool.query(sql, [howItWorksPdf]);
    return result;
};

exports.insertHowItWorksPdf = async(howItWorksPdf, userId) => {
    let sql = `INSERT INTO howItWorks (howItWorksPdf, userId) VALUES (?, ?)`;
    const [result] = await promisePool.query(sql, [howItWorksPdf, userId]);
    return result;
};

exports.uploadHowItWorksPdf = async(howItWorksPdf, howItWorksId) => {
    let sql = `UPDATE howItWorks SET updatedDateTime = CURRENT_TIMESTAMP(), howItWorksPdf = ? WHERE id = ?`;
    const [result] = await promisePool.query(sql, [howItWorksPdf, howItWorksId]);
    return result
}