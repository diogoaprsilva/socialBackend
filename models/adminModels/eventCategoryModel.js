const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getEventCategory = async() => {
    let sql = `SELECT ec.id, ec.categoryName, ec.isBlock as Status, ec.datetime FROM eventCategory as ec WHERE 1`;
    const [result] = await promisePool.query(sql);
    return result;
}

exports.getEventsCategoryDetailsById = async(id) => {
    let sql = `SELECT ec.id, ec.categoryName, ec.isBlock as Status, ec.datetime FROM eventCategory as ec WHERE id= ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result;
}

exports.insertEventsCategoryDetails = async(categoryName) => {
    let sql = `INSERT INTO eventCategory (categoryName) VALUES (?)`;
    const [result] = await promisePool.query(sql, [categoryName]);
    return result.affectedRows;
};

exports.updateEventsCategoryById = async( categoryName, id) => {
    let sql = `UPDATE eventCategory SET categoryName = ? WHERE id = ?`;
    const [result] = await promisePool.query(sql, [ categoryName, id]);
    return result.affectedRows;

};

exports.updateEventsCategoryStatusById = async(id) => {
    let sql = `UPDATE eventCategory SET isBlock = (CASE isBlock WHEN 1 THEN 0 ELSE 1 END) WHERE id= ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result.affectedRows;
}