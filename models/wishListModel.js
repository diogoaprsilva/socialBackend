const config = require('../config');
const promisePool = require('../utils/connection');

exports.getWishList = async(userId,data) => {
    let sql = `SELECT * FROM offerWishList WHERE userId =? and offerId =?`;
    const [result] = await promisePool.query(sql,[userId,data.offerId]);
    return result;
}

exports.getOfferWishList = async(userId) => {
    let sql = `SELECT (SELECT round(SUM(rating)/COUNT(userId)) as offerRating  FROM reviewRating where offerId=ol.id) as offerRating,isOfferLiked(ol.id,${userId}) as isLiked, ol.id,ol.offerCategoryId,ol.offerName,ol.offerDescription,ol.offerPrice,ol.offerPercent,ol.offerCode, ol.offerType,oc.name as offerCategoryName,getimageArray(ol.id,"${config.imageUrl}") as imageArr FROM offersList as ol LEFT JOIN offerCategory as oc ON oc.id=ol.offerCategoryId  WHERE  isOfferLiked(ol.id,${userId}) = 1 and  ol.status=1  ORDER BY ol.id DESC`;
    const [result] = await promisePool.query(sql,[userId]);
    return result;
}

exports.insertWishList = async(userId,data) => {
    let sql = `INSERT INTO offerWishList (userId, offerId) VALUES (?, ?)`;
    const [result] = await promisePool.query(sql, [userId, data.offerId]);
    return result;
}

exports.deletewishList = async(userId,data) => {

   
    let sql = `Delete from offerWishList where userId = ? and offerId = ? `;
    const [result] = await promisePool.query(sql,[userId,data.offerId]);
    return result

}

