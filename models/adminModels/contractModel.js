const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getContractDetails = async() => {

    let sql = `SELECT id, userId, contractPdf, status, uploadedBy, date_format(date_add(datetime, interval 330 minute),'%Y-%m-%d') as datetime, updatedTime FROM contract WHERE uploadedBy = 1 `;
    const [result] = await promisePool.query(sql,[]);
    
    return result;
};

// exports.getContractTemplate = async() => {
//     let sql = `SELECT c.id, c.userId, c.contractPdf, c.status, date_format(date_add(c.updatedTime, interval 330 minute),'%Y-%m-%d') as updatedTime, ur.loginType FROM contract AS c
//     LEFT JOIN userRegistration AS ur ON ur.id = userId WHERE ur.loginType = 1 AND 2 ORDER BY id DESC`;
//     const [result] = await promisePool.query(sql,[]);
//     return result;
// };

// exports.getContractTemplate = async() => {
    
//     let sql = `SELECT id, userId, contractPdf, status, uploadedBy, date_format(date_add(datetime, interval 330 minute),'%Y-%m-%d') as datetime, updatedTime FROM contract WHERE uploadedBy = 1 `;
//     const [result] = await promisePool.query(sql,[]);
    
//     return result;
// };


exports.getContractDetailsById = async(contractId) => {
    let sql = `SELECT id, userId, contractPdf, status, date_format(date_add(datetime, interval 330 minute),'%Y-%m-%d') as datetime FROM contract WHERE id= ?`;
    const [result] = await promisePool.query(sql, [contractId]);
    return result;
};

exports.getContractDetailsByUserId = async(userId) => {
    let sql = `SELECT id, userId, contractPdf, status, date_format(date_add(datetime, interval 330 minute),'%Y-%m-%d') as datetime FROM contract WHERE userId= ?`;
    const [result] = await promisePool.query(sql, [userId]);
    return result;
};

exports.getContractDetailsByPdf = async(contractPdf) => {
    let sql = `SELECT userId, contractPdf FROM contract WHERE contractPdf = ?`;
    const [result] = await promisePool.query(sql, [contractPdf]);
    return result;
}

exports.insertContractDetails = async(contractPdf, userId) => {
    let sql = `INSERT INTO contract (contractPdf, userId, updatedTime, uploadedBy) VALUES (?, ?, CURRENT_TIMESTAMP, 2)    `;
    const [result] = await promisePool.query(sql, [contractPdf, userId]);
    return result;
};

exports.updateContractDetails = async(contractPdf, userId) => {
    let sql = `UPDATE contract SET updatedTime = CURRENT_TIMESTAMP, contractPdf = ?, userId = ? WHERE uploadedBy = 1`;
    const [result] = await promisePool.query(sql, [contractPdf, userId]);
    return result.affectedRows;
}

exports.getContractTemplateById = async(userId) => {
    let sql = `SELECT id, userId, contractPdf, status, uploadedBy, date_format(date_add(datetime, interval 330 minute),'%Y-%m-%d') as datetime FROM contract WHERE userId= ?`;
    const [result] = await promisePool.query(sql, [userId]);
    return result;
};

exports.updateContractDetailsByVendor = async(contractPdf, userId) => {
    let sql = `UPDATE contract SET updatedTime = CURRENT_TIMESTAMP, contractPdf = ? WHERE userId = ?`;
    const [result] = await promisePool.query(sql, [contractPdf, userId]);
    return result.affectedRows;
}