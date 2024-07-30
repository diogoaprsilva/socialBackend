const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getVendorOfferList = async(userId) => {
    let sql = `SELECT ol.id, ol.userId, ol.offerName, ol.offerCode, ol.offerType, ol.offerLocation, oc.name as offerCategoryName, date_format(date_add(ol.datetime, interval 330 minute),'%Y-%m-%d') as datetime, ol.status, ol.isApproved from offersList as ol 
    LEFT JOIN offerCategory as oc ON ol.offerCategoryId = oc.id 
    WHERE ol.userId = ? AND ol.isDeleted = 1 ORDER BY ol.id DESC`;
    const [result] = await promisePool.query(sql, [userId]);
    return result;
};

exports.getOfferListByVendorId = async(id, vendorId) => {
    let sql = `SELECT * from offersList where id =? and userId = ?`;
    
    const [result] = await promisePool.query(sql, [id, vendorId]);
    return result;
}

exports.getOfferImageUserIdandOfferId = async(data, userId) => {
    let sql = `SELECT image FROM offerImages WHERE userId = ? AND offerId = ?`
    const [result] = await promisePool.query(sql, [data.offerId, userId]);
    return result;
}

exports.getOfferListById = async(id,userId) => {
    console.log(userId);
    let sql = `SELECT id , userId from offersList where id = ? and userId = ? `;
    
    const [result] = await promisePool.query(sql, [id, userId]);
    return result;
}

exports.getVendorOfferName = async(offerName) => {
    let sql =  `SELECT offerName FROM offersList WHERE offerName = ? AND isDeleted = 1`
    const [result] = await promisePool.query(sql, [offerName]);
    return result;
},

exports.checkIsOfferFree = async(userId) => {
    let sql =  `SELECT id, isOfferFree FROM userRegistration WHERE id = ? AND isOfferFree = 1`
    const [result] = await promisePool.query(sql, [userId]);
    return result;
},


exports.insertVendorOfferList = async(userId, offerCategoryId, offerName, offerDescription, offerTermsAndCondition, offerLocation, offerPercent, offerPrice, offerType, offerAddress, isOfferFree, brandLogo, offerCode) => {
    let sql = `INSERT INTO offersList (userId, offerCategoryId, offerName, offerDescription, offerTermsAndCondition, offerLocation, offerPercent, offerPrice, offerType, offerAddress, isOfferFree, brandLogo,offerCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
    const [result] = await promisePool.query(sql, [userId, offerCategoryId, offerName, offerDescription, offerTermsAndCondition, offerLocation, offerPercent, offerPrice, offerType, offerAddress, isOfferFree, brandLogo, offerCode]);
   
    return result;
},

// exports.updateBrandLogoOfferList = async(brandLogo, id) => {
//     let sql = `UPDATE offersList SET brandLogo = '${brandLogo}' WHERE id = ${id}`;
//     const [result] = await promisePool.query(sql);
//     return result;
// }

exports.insertOfferImages = async(data) => {
    let sql = `INSERT INTO offerImages (userId,offerId,image) VALUES (?, ?, ?)`;
    const [result] = await promisePool.query(sql, [data.userId,data.offerId,data.image]);
    return result;
},

exports.updateVendorOfferList = async(offerName, offerDescription, offerTermsAndCondition, offerLocation, offerPercent, offerPrice, offerType, offerAddress, offerCategoryId, brandLogo, id) => {
    let sql = `UPDATE offersList SET offerName=?, offerDescription=?, offerTermsAndCondition=?, offerLocation=?, offerPercent=?, offerPrice=?, offerType = ?,  offerAddress=?, offerCategoryId = ?, brandLogo = ? WHERE id = ?`;
    const [result] = await promisePool.query(sql, [offerName, offerDescription, offerTermsAndCondition, offerLocation, offerPercent, offerPrice, offerType, offerAddress, offerCategoryId, brandLogo, id]);
    return result.affectedRows;
}

exports.deleteOfferImages = async(data) => {
    let sql = `DELETE  from offerImages WHERE userId = ? and offerId = ?`;
    const [result] = await promisePool.query(sql, [data.userId, data.offerId]);
    return result.affectedRows;
};

exports.getOfferImagesById = async(offerImagesId) => {
    let sql = `SELECT id, image FROM offerImages WHERE id = ?`;
    const [result] = await promisePool.query(sql, [offerImagesId]);
    return result;
};

exports.getOfferListByUserIdandOfferId = async(data, userId) => {
    let sql = `SELECT ol.id, ol.userId, ol.offerCategoryId, ol.offerAddress, ol.offerName, ol.offerType, ol.offerPrice, ol.offerDescription, ol.offerTermsAndCondition, ol.offerLocation, ol.offerPercent, oc.name, date_format(date_add(ol.datetime, interval 330 minute),'%Y-%m-%d') as datetime, getImageArray(ol.id,"${config.imageUrl}") as offerImage from offersList as ol LEFT JOIN offerCategory as oc on ol.offerCategoryId = oc.id WHERE ol.id = ? AND ol.userId = ?`;
    
    const [result] = await promisePool.query(sql, [data.offerId, userId]);
    return result
}

exports.getOfferImageUserIdandOfferIdBack = async( offerId, userId) => {
    let sql = `SELECT ol.id, ol.userId, ol.offerCategoryId, ol.offerAddress, ol.offerName, ol.offerType, ol.offerPrice, ol.offerDescription, ol.offerTermsAndCondition, ol.offerLocation, ol.offerPercent, ol.brandLogo, oc.name, date_format(date_add(ol.datetime, interval 330 minute),'%Y-%m-%d') as datetime, getOfferImageOfArray(ol.id) as offerImage from offersList as ol LEFT JOIN offerCategory as oc on ol.offerCategoryId = oc.id WHERE ol.id = ? AND ol.userId = ?`
    const [result] = await promisePool.query(sql, [offerId, userId]);
    console.log(result);
    return result;
}

exports.updateVendorOfferImagest = async(data) => {
    let sql = `UPDATE offerImages set image=? where  offerId =? and offerId= ? `;
    const [result] = await promisePool.query(sql, [data.image, data.offerId, data.offerId]);
    return result.affectedRows;
};

exports.updateOfferListStatusByVendor = async(offerId) => {
    let sql = `UPDATE offersList SET status = (CASE status WHEN 1 THEN 0 ELSE 1 END) WHERE id= ?`;
    const [result] = await promisePool.query(sql, [offerId]);
    return result.affectedRows;
};

exports.getListOfRedeemOfferByUser = async(offerId) => {
    let sql =  `SELECT ur.id, ol.id, ur.userName, ur.email, ur.mobileNumber, ol.offerName, ol.offerCategoryId, ol.offerDescription, ol.offerLocation, ol.offerPrice, date_format(date_add(ol.datetime, interval 330 minute),'%Y-%m-%d') as datetime from redeemOffer as ro 
    LEFT JOIN offersList as ol on ro.offerId = ol.id 
    LEFT JOIN userRegistration as ur on ro.userId = ur.id 
    where ol.id =? AND ur.isAccountDeleted = 0 ORDER BY ol.id DESC`;
    const [result] = await promisePool.query(sql, [offerId]);
    return result;
}

exports.getRedeemOffersList = async(vendorId) => {
    let sql =  `SELECT ro.id, ro.offerId, offerName, ur.userName, ur.email, ur.mobileNumber, ro.dateTime FROM redeemOffer AS ro
    LEFT JOIN offersList AS ol ON ol.id = ro.offerId
    LEFT JOIN userRegistration as ur on ro.userId = ur.id 
    WHERE ro.offerId = ol.id AND ol.userId = ${vendorId} AND ur.isAccountDeleted = 0 AND ol.isDeleted = 1 ORDER BY ol.id DESC`;
    const [result] = await promisePool.query(sql, []);
    return result;
}







