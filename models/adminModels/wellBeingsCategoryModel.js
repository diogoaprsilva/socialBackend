const config = require('../../config');
const promisePool = require('../../utils/connection');


exports.getWellBeingsCategoryData = async() => {
    let sql = `SELECT id, name, status, dateTime FROM wellBeingsCategory WHERE status = 1 AND isDeleted = 1 ORDER BY id ASC`;
    let sql1 = `SELECT name,description,concat('${config.imageUrl}',image) as imageUrl,concat('${config.imageUrl}',backgroundImage) as backgroundImageUrl,image,backgroundImage FROM wellBeingsBlog ORDER BY id DESC `
    const [result] = await promisePool.query(sql);
    const [result1] = await promisePool.query(sql1);
    return {
        result :result,
        result1 :result1
    };
}

exports.getWellBeingsCategoryDataById = async(id) => {
    let sql = `SELECT id, name, status FROM wellBeingsCategory WHERE id=?`;
    const [result] = await promisePool.query(sql, [id]);
    return result;
}

exports.getWellBeingsCategoryDataByName = async(name) => {
    let sql = `SELECT name FROM wellBeingsCategory WHERE name=? AND isDeleted = 1`;
    const [result] = await promisePool.query(sql, [name]);
    return result;
}

exports.insertWellBeingsCategory = async(name) => {
    let sql = `INSERT INTO wellBeingsCategory (name) VALUES (?)`;
    const [result] = await promisePool.query(sql, [name]);
    return result
}

exports.updatetWellBeingsCategory = async(data) => {
    let sql = `UPDATE wellBeingsCategory SET name = ? WHERE id = ?`;
    const [result] = await promisePool.query(sql, [data.name, data.id]);
    return result
}

exports.wellBeingsCategoryStatusChange = async(id) => {
    let sql = `UPDATE wellBeingsCategory SET status = (CASE status WHEN 1 THEN 0 ELSE 1 END) where id= ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result
};

exports.deleteWellBeingData = async(id) => {
    let sql = `DELETE FROM wellBeingsBlog WHERE id = ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result.affectedRows;
}


