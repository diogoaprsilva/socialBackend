const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getOfferCategoryDetails = async() => {
    let sql = `SELECT id, name, image, status, datetime FROM offerCategory WHERE status = 1 ORDER BY id DESC`;
    const [result] = await promisePool.query(sql);
    return result;
}

exports.getOfferListById = async(offerId) => {
    let sql = `SELECT id, userId, offerCategoryId, offerName, offerPrice FROM offersList where id = ?`;
    const [result] = await promisePool.query(sql, [offerId]);
   
    return result;
}

exports.getOfferCategoryDetailsByName = async(data) => {
    let sql = `SELECT id, name, image, status, datetime FROM offerCategory WHERE name = ? AND isDeleted = 1`;
    const [result] = await promisePool.query(sql, [data]);
    return result;
}

exports.insertOfferCategory = async(data) => {
    let sql = `INSERT INTO offerCategory (name, image) VALUES (? , ?)`;
    const [result] = await promisePool.query(sql, [data.name, data.image]);
    return result;
}

exports.updateOfferCategory = async(name, image, id) => {
    let sql = `UPDATE offerCategory SET name = ?, image = ? WHERE id = ?`
    const [result] = await promisePool.query(sql, [name, image, id]);
    return result;
}

exports.getOfferCategoryDetailsById = async(id) => {
    let sql = `SELECT name, image, status, datetime FROM offerCategory WHERE id = ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result;
}

exports.offerCategoryStatusChangeById = async(id) => {
    let sql = `UPDATE offerCategory SET status = (CASE status WHEN 1 THEN 0 ELSE 1 END) WHERE id=?`;
    const [result] = await promisePool.query(sql, [id]);
    return result;

}