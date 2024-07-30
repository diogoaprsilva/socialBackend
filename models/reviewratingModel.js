const config = require('../config');
const promisePool = require('../utils/connection');

exports.getReviewRating = async(userId,data) => {
    let sql = `SELECT * FROM reviewRating WHERE userId =? and offerId =?`;
    const [result] = await promisePool.query(sql,[userId,data.offerId]);
    return result;
}

exports.insertReviewRating= async(userId,data) => {
    let sql = `INSERT INTO reviewRating (userId, offerId,review,rating) VALUES (?,?,?,?)`;
    const [result] = await promisePool.query(sql, [userId, data.offerId,data.review,data.rating]);
    return result;
}

exports.updateReviewRating = async(userId,data) => {

    let sql = `update reviewRating SET rating=?,review=? where userId = ? and offerId = ? `;
    const [result] = await promisePool.query(sql,[data.rating,data.review,userId,data.offerId]);
    return result

}

