const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getFaqData = async() => {
    let sql = `SELECT id, question, answer FROM faq WHERE 1 ORDER BY id DESC`;
    const [result] = await promisePool.query(sql);
    return result;
}

exports.getFaqDataById = async(id) => {
    let sql = `SELECT id, question, answer FROM faq WHERE id= ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result;
};

exports.getFaqDataByQuestion = async(question) => {
    let sql = `SELECT id, question, answer FROM faq WHERE question= ?`;
    const [result] = await promisePool.query(sql, [question]);
    return result;
}

exports.insertFaqData  = async(question, answer) => {
    let sql = `INSERT INTO faq (question, answer) VALUES (?, ?)`;
    const [result] = await promisePool.query(sql, [question, answer]);
    return result;
}

exports.updateFaqData = async(question, answer, id) => {
    let sql = `UPDATE faq SET question= ?, answer= ? WHERE id= ? `;
    const [result] = await promisePool.query(sql, [question, answer, id]);
    return result
};

exports.deleteFaq = async(id) => {
    let sql = `DELETE  FROM faq WHERE id = ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result.affectedRows;
}
