const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getOfferListDetails = async() => {
    let sql = `SELECT ol.id as offerId, ol.isOfferFree, ol.userId, ol.offerPrice, ol.offerName, ur.userName as venderName, oc.name as category, ol.datetime as createdOn, ol.offerType, ol.status as Active, ol.isApproved as approved, getTotalNumberOfRedeemOffer(ol.id) as userCount from offersList as ol LEFT JOIN userRegistration as ur ON ol.userId = ur.id LEFT JOIN offerCategory as oc ON ol.offerCategoryId = oc.id 
    WHERE ol.isDeleted = 1 ORDER by ol.id DESC`;
    const [result] = await promisePool.query(sql);
    return result
};

exports.getOfferListDetailsByUser = async(userId) => {
    let sql = `SELECT ol.id as offerListID,getOfferCountByUserId(ol.userId) as userOfferCount, ol.offerName as offerName, oc.name as category, ur.userName as vendorName, ol.datetime as offerListDate, oc.datetime as categoryDate FROM offersList as ol LEFT JOIN userRegistration as ur ON ol.userId = ur.id LEFT JOIN offerCategory as oc ON ol.offerCategoryId = oc.id 
    WHERE ol.userId = ? ORDER BY ol.id DESC`;
    const [result] = await promisePool.query(sql, [userId]);
    return result;
};

exports.getUnapprovedOffers = async() => {
    let sql = `SELECT ol.id, ol.offerName, ur.userName as vendorName, oc.name as category, ol.datetime as createdOn, ol.offerType, ol.status as active, ol.isApproved, getOfferCreatedByVendor(ur.id) as userCount FROM offersList as ol LEFT JOIN offerCategory as oc ON ol.offerCategoryId = oc.id LEFT JOIN userRegistration as ur ON ol.userId = ur.id WHERE ol.isApproved = ? AND ol.isDeleted = 1 AND ol.status = 1 ORDER BY ol.id DESC`;
    const [result] = await promisePool.query(sql, [2]);
    return result
};

exports.updateOfferList = async(offerCategoryId, offerName, offerPrice, id) => {
    let sql = `UPDATE offersList SET offerCategoryId =?,  offerName= ?, offerPrice= ?  WHERE id = ?`;
    const [result] = await promisePool.query(sql, [offerCategoryId, offerName, offerPrice, id]);
    return result.affectedRows;
};

exports.getRedeemOfferByUser = async(userId) => {
    let sql = `SELECT ro.id, ro.userId, ro.offerId, ro.redeemCode, ol.offerName, ol.offerDescription, ol.offerPrice, ol.offerPercent,ol.offerType, ur.userName from redeemOffer as ro LEFT JOIN offersList as ol ON ro.offerId = ol.id LEFT JOIN userRegistration as ur ON ro.userId = ur.id WHERE ro.userId = ?  ORDER BY ro.id DESC`;
    const [result] = await promisePool.query(sql, [userId]);
    return result;
};

exports.updateStatusForApproved = async(isApproved, offerId) => {
    let sql = `UPDATE offersList SET isApproved = ? WHERE id = ?`;
    const [result] = await promisePool.query(sql, [isApproved, offerId]);
    return result.affectedRows;
};

exports.getOfferListDetailsForIsApproved = async(offerId) => {
    let sql = `SELECT id, isApproved FROM offersList WHERE id = ?`;
    const [result] = await promisePool.query(sql, [offerId]);
    return result;
}

exports.getCountryCodeList = async(offerId) => {
    let sql = `SELECT * FROM country`;
    const [result] = await promisePool.query(sql, [offerId]);
    return result;
}

exports.updateIsOfferFreeInOfferList = async(id)=>{
    let sql = `UPDATE offersList SET isOfferFree = (CASE isOfferFree WHEN 1 THEN 0 ELSE 1 END) WHERE id = ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result
  }