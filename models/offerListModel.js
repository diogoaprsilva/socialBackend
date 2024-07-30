const config = require("../config");
const promisePool = require("../utils/connection");

exports.getOfferList = async (userId) => {
  let sql = `SELECT ol.offerCategoryId,ol.offerName,ol.offerDescription, ol.isOfferFree, ol.offerPrice,ol.offerPercent,ol.offerCode,oc.name as offerCategoryName,getimageArray(ol.id,"${config.imageUrl}") as imageArr FROM offersList as ol LEFT JOIN offerCategory as oc ON oc.id=ol.offerCategoryId  WHERE ol.userId =? and ol.status=1  ORDER BY ol.id DESC`;
  const [result] = await promisePool.query(sql, [userId]);
  return result;
};

exports.getOfferListByName = async (data) => {
  let sql = `SELECT offerName, offerDescription,  offerPercent FROM offersList WHERE UPPER(offerName)=(?) AND isDeleted = 1`;
  const [result] = await promisePool.query(sql, [data.offerName]);
  return result;
};

exports.insertOfferList = async (data) => {
  let sql = `INSERT INTO offersList (userId,offerCategoryId,offerName, offerDescription,offerPrice,  offerPercent,offerCode,offerType) VALUES (?,?,?,?,?,?,?)`;
  const [result] = await promisePool.query(sql, [
    data.userId,
    data.offerCategoryId,
    data.offerName,
    data.offerDescription,
    data.offerPrice,
    data.offerPercent,
    data.offerCode,
    data.offerType,
  ]);
  return result;
};

exports.insertOfferImages = async (data) => {
  let sql = `INSERT INTO offerImages (userId,offerId,image) VALUES (?, ?, ?)`;
  const [result] = await promisePool.query(sql, [
    data.userId,
    data.offerId,
    data.image,
  ]);
  return result;
};

exports.getOfferListById = async (user_id,data) => {
  let sql = `SELECT (SELECT round(SUM(rating)/COUNT(userId)) as offerRating  FROM reviewRating where offerId=?) as offerRating,(SELECT COUNT(userId) as reviewCount  FROM reviewRating where offerId=?) as reviewCount,isOfferRedeem(ol.id,${user_id}) as isofferRedeem, isOfferLiked(ol.id,${user_id}) as isLiked, ol.id,ol.offerCategoryId, concat('${config.imageUrl}', ol.brandLogo) as brandLogo , ol.offerName,ol.offerDescription, ol.isOfferFree, ol.offerTermsAndCondition, (ol.offerPrice-ol.offerPrice*ol.offerPercent/100) as offPrice ,ol.offerPrice,ol.offerPercent,ol.offerCode, ol.offerType,oc.name as offerCategoryName,getimageArray(ol.id,"${config.imageUrl}") as imageArr,getUserRelatedOfferArray(ol.offerCategoryId,"${config.imageUrl}",ol.userId) as  otherOffers FROM offersList as ol LEFT JOIN offerCategory as oc ON oc.id=ol.offerCategoryId  WHERE  ol.id=? and ol.status=1  ORDER BY ol.id DESC`;

  const [result] = await promisePool.query(sql, [data.id,data.id,data.id]);
  return result;
};

exports.insertUserTracker = async (data) => {
  let sql = `INSERT INTO userTracker Set ?`;
  const [result] = await promisePool.query(sql, [data]);
  return result;
};

exports.deleteOfferById = async (userId, data) => {
  let sql = `update  offersList SET status=0 WHERE userId=? and id=?`;
  const [result] = await promisePool.query(sql, [userId, data.id]);
  return result;
};

exports.deleteOfferImageById = async (userId, data) => {
  let sql = `update  offerImages SET status=0 WHERE userId=? and offerId=?`;
  const [result] = await promisePool.query(sql, [userId, data.id]);
  return result;
};

exports.getCategory = async () => {
  let sql = `SELECT id,name,image,concat('${config.imageUrl}',image) as imageUrl FROM  offerCategory where status=1`;
  const [result] = await promisePool.query(sql);
  return result;
};

exports.getHomeOffer = async (user_id) => {
  let sql = `SELECT *, getOfferArray(id,"${config.imageUrl}",${user_id}) as  offerArr FROM  offerCategory WHERE status=1 and getOfferArray(id,"${config.imageUrl}",${user_id}) is not null `;
  const [result] = await promisePool.query(sql);
  return result;
};

exports.checkPlanSubscription = async (user_id) => {
  let sql = `SELECT * FROM planSubscription WHERE userId = ? AND status = 1`;
  const [result] = await promisePool.query(sql,[user_id]);
  return result;
};

exports.getRecommendedOffer = async (user_id) => {
  let sql = `select ol.id,ol.offerAddress, ol.isOfferFree, ol.offerCategoryId,ol.offerName,ol.offerDescription,ol.offerPrice,ol.offerPercent,ol.offerCode,getimageArray(ol.id,"${config.imageUrl}") as imageArr, ol.offerType,(SELECT round(SUM(rating)/COUNT(userId)) as offerRating  FROM reviewRating) as offerRating, isOfferLiked(ol.id,${user_id}) as isLiked from offersList as ol inner join (select categoryId from userTracker where userId=${user_id} group by categoryId order by count(id) desc limit 1) as c on c.categoryId=ol.offerCategoryId WHERE ol.isApproved = 1 and ol.status = 1 and ol.isDeleted = 1 `;
  const [result] = await promisePool.query(sql);
  return result;
};

exports.getRecommendedDefaultOffer = async () => {
  let sql = ` select ol.id,ol.offerAddress, ol.isOfferFree, ol.offerCategoryId,ol.offerName,ol.offerDescription,ol.offerPrice,ol.offerPercent,ol.offerCode,getimageArray(ol.id,"${config.imageUrl}") as imageArr, ol.offerType,(SELECT round(SUM(rating)/COUNT(userId)) as offerRating  FROM reviewRating) as offerRating from offersList as ol WHERE ol.isApproved = 1 AND ol.status = 1 AND ol.isDeleted = 1 `;
  
  const [result] = await promisePool.query(sql);
  return result;
};

exports.getOfferListByCategoryId = async (data, user_id) => {
  let sql = `SELECT ol.id, ol.offerCategoryId, ol.isOfferFree, ol.offerName, ol.offerAddress, ol.offerLocation, ol.offerDescription,ol.offerPrice,ol.offerPercent,ol.offerCode, rr.rating, ol.offerType,oc.name as offerCategoryName,getimageArray(ol.id,"${config.imageUrl}") as imageArr,  isOfferLiked(ol.id,${user_id}) as isLiked FROM offersList as ol 
  LEFT JOIN offerCategory as oc ON oc.id=ol.offerCategoryId
  LEFT JOIN reviewRating AS rr ON rr.offerId = ol.id
  WHERE ol.offerCategoryId=? and ol.status=1 and ol.isApproved = 1 ORDER BY ol.id DESC `;
  const [result] = await promisePool.query(sql, [data.categoryId]);

  return result;
};

exports.getSpecialOfferList = async () => {
  let sql = `SELECT ol.id,ol.offerCategoryId, ol.isOfferFree, ol.offerAddress,ol.offerName,ol.offerDescription,ol.offerPrice,ol.offerPercent,ol.offerCode,  ol.offerType,oc.name as offerCategoryName,getimageArray(ol.id,"${config.imageUrl}") as imageArr FROM offersList as ol LEFT JOIN offerCategory as oc ON oc.id=ol.offerCategoryId  WHERE ol.offerType=1 and  ol.status=1 and ol.isApproved = 1 ORDER BY ol.id DESC`;
  const [result] = await promisePool.query(sql);
  return result;
};

exports.insertRedeemOffer = async (data) => {
  let sql = `insert into redeemOffer SET ?`;
  const [result] = await promisePool.query(sql, [data]);
  return result;
};

exports.redeemOfferCode = async (data) => {
  let sql = `SELECT offerName, offerDescription, offerCode, id FROM offersList WHERE id=? and  UPPER(offerCode)=UPPER(?)`;
  const [result] = await promisePool.query(sql, [
    data.offerId,
    data.redeemCode,
  ]);

  return result;
};

exports.redeemOfferAlreday = async (userId, data) => {
  let sql = `SELECT * FROM redeemOffer WHERE userId=? and  UPPER(redeemCode)=UPPER(?) ORDER BY id Desc`;
  const [result] = await promisePool.query(sql, [userId, data.redeemCode]);

  return result;
};

exports.getOfferListByUser = async () => {
  let sql = `SELECT ol.id as offerListID, ol.offerName as offerName, oc.name as category, ur.userName as vendorName, ol.datetime as offerListDate, oc.datetime as categoryDate FROM offersList as ol LEFT JOIN userRegistration as ur ON ol.userId = ur.id LEFT JOIN offerCategory as oc ON ol.offerCategoryId = oc.id`;

  const [result] = await promisePool.query(sql);
  return result;
};

exports.searchOffer = async (data, user_id) => {
  let sql = `SELECT ol.id,ol.offerCategoryId,ol.offerName,ol.status,ol.offerDescription,rr.rating,ol.offerPrice,ol.offerAddress, ol.offerLocation, ol.offerPercent,ol.offerCode,oc.name as offerCategoryName,getimageArray(ol.id,"${config.imageUrl}") as imageArr, isOfferLiked(ol.id,${user_id}) as isLiked FROM offersList as ol
  LEFT JOIN reviewRating AS rr ON rr.offerId = ol.id
  LEFT JOIN offerCategory as oc ON oc.id=ol.offerCategoryId  ${data} and ol.status=1 and ol.isApproved = 1 AND ol.isDeleted = 1 ORDER BY ol.id DESC`;
  const [result] = await promisePool.query(sql);
  return result;
};

exports.redeemOfferHistory = async (userId) => {
  let sql = `SELECT r.id, o.offerName, r.redeemCode, date_format(r.datetime,'%Y-%m-%d %H:%i:%s') as datetime FROM redeemOffer as r LEFT JOIN offersList as o ON r.offerId = o.id WHERE r.userId = ?`;
  const [result] = await promisePool.query(sql, [userId]);
  return result;
};
