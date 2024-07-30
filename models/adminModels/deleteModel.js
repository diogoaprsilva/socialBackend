
const promisePool = require('../../utils/connection');

exports.deleteSuperAdmin = async (data) => {
  let sql = `update userRegistration SET email = CONCAT(email, '_DELETED_'), mobileNumber = CONCAT(mobileNumber, '_DELETED_'), deleted_date = now(), isAccountDeleted = ?, isBlock = ? WHERE id = ?`;
  const [result, fields] = await promisePool.query(sql, [1, 1, data.id]);
  return result;
};

exports.deleteSubAdmin = async (data) => {
  let sql = `update userRegistration SET email = CONCAT(email, '_DELETED_'), mobileNumber = CONCAT(mobileNumber, '_DELETED_'), deleted_date = now(), isAccountDeleted = ?, isBlock = ? WHERE id = ?`;
  const [result, fields] = await promisePool.query(sql, [1, 1, data.id]);
  return result;
};

exports.deleteTeacher = async (data) => {
  let sql = `update userRegistration SET email = CONCAT(email, '_DELETED_'), mobileNumber = CONCAT(mobileNumber, '_DELETED_'), deleted_date = now(), isAccountDeleted = ?, isBlock = ? WHERE id = ?`;
  const [result, fields] = await promisePool.query(sql, [1, 1, data.id]);
  return result;
};

exports.deleteVendor = async (data) => {
  let sql = `update userRegistration SET email = CONCAT(email, '_DELETED_'), mobileNumber = CONCAT(mobileNumber, '_DELETED_'), deleted_date = now(), isAccountDeleted = ?, isBlock = ? WHERE id = ?`;
  const [result, fields] = await promisePool.query(sql, [1, 1, data.id]);
  return result;
};

exports.deleteOffer = async (data) => {
  let sql = `update offersList SET isDeleted = ?, status = ?, isApproved = ? WHERE id = ?`;
  const [result, fields] = await promisePool.query(sql, [0, 0, 2, data.id]);
  return result;
};

exports.deleteEvent = async (data) => {
  let sql = `update events SET isDeleted = ?, status = ? WHERE id = ?`;
  const [result, fields] = await promisePool.query(sql, [0, 0, data.id]);
  return result;
};


exports.deleteOfferCategory = async (data) => {
  let sql = `update offerCategory SET isDeleted = ?, status = ? WHERE id = ?`;
  const [result, fields] = await promisePool.query(sql, [0, 0, data.id]);
  return result;
};

exports.deleteWellbeingCategory = async (data) => {
  let sql = `update wellBeingsCategory SET isDeleted = ?, status = ? WHERE id = ?`;
  const [result, fields] = await promisePool.query(sql, [0, 0, data.id]);
  return result;
}; 