const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getAdminDetails = async (data) => {
    let sql = `SELECT  id, userName, isBlock, dateOfBirth, mobileNumber, email, password, loginType  FROM userRegistration WHERE email= ? AND loginType IN (?, ?)`;
    const [result] = await promisePool.query(sql, [data.email, 1, 2]);
    return result;
}

exports.getAdminInfo = async (email) => {
    let sql = `SELECT id, userName, dateOfBirth, mobileNumber, email, password, loginType, profilePic FROM userRegistration where email = ?`;
    const [result] = await promisePool.query(sql, [email]);
    return result;
}

exports.adminUpdatePassword = async (newPassword, email) => {
    let sql = `UPDATE userRegistration SET password = ? WHERE email = ?`;
    const [result] = await promisePool.query(sql, [newPassword, email]);
    return result;
}

exports.adminInsertActivity = async (activityData) => {
    let sql = `INSERT INTO activity (activity_type, user_id, ip) VALUES ('${activityData.activity_type}', '${activityData.user_id}', '${activityData.ip}')`;
    const [result] = await promisePool.query(sql);
    return result;
}

exports.updateProfilePic = async (profilePic, admin_email) => {
    let sql = `UPDATE userRegistration SET profilePic = ? WHERE email = ?`;
    const [result] = await promisePool.query(sql, [profilePic, admin_email]);
    return result
}

exports.getAdminProfilePIc = async (email) => {
    let sql = `SELECT id, userName, email, profilePic FROM userRegistration WHERE email = ?`;
    const [result] = await promisePool.query(sql, [email]);
    return result
}


exports.getUserListById = async (id) => {
    let sql = `SELECT userName, date_format(date_add(dateOfBirth, interval 330 minute),'%Y-%m-%d') AS dateOfBirth, mobileNumber, email, profilePic, password, loginType, isBlock FROM userRegistration WHERE id = ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result
}

exports.getSuperAdminList = async () => {
    let sql = `SELECT ur.id, ur.userName, ur.dateOfBirth, ur.gender, ur.email, ur.mobileNumber, date_format(date_add(ur.created_date, interval 330 minute),'%Y-%m-%d') as datetime FROM userRegistration as ur WHERE loginType = ? AND isAccountDeleted = 0 ORDER BY ur.id DESC
    `;
    const [result] = await promisePool.query(sql, [1]);
    return result;
}

exports.userBlockByAdmin = async (id) => {
    let sql = `UPDATE userRegistration  SET isBlock = (CASE isBlock WHEN 1 THEN 0 ELSE 1 END) WHERE id=?`;
    const [result] = await promisePool.query(sql, [id]);
    return result.affectedRows

}

exports.updateIsOfferFree = async (id) => {
    let sql = `UPDATE userRegistration SET isOfferFree = (CASE isOfferFree WHEN 1 THEN 0 ELSE 1 END) WHERE id = ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result
}

exports.updateAllOfferToFree = async (status, id) => {
    let sql = `UPDATE offersList SET isOfferFree = ? WHERE userId = ?`;
    const [result] = await promisePool.query(sql, [status, id]);
    return result
}

exports.getFCMToken = async () => {
    let sql = `SELECT FCM_token FROM userRegistration WHERE isAccountDeleted = 0 AND FCM_token IS NOT NULL`;
    const [result] = await promisePool.query(sql, []);
    return result

}

exports.getAccountDetailsById = async (data) => {
    let sql = `select * from userRegistration where email =? limit 1`;
    const [result] = await promisePool.query(sql, [data.email]);
    return result;
  }; 
  
  exports.deleteAccount = async (userId) => {
    let sql = `UPDATE userRegistration SET isAccountDeleted = 1, email = CONCAT(email, '_DELETED_', ${userId}), mobileNumber = CONCAT(mobileNumber, '_DELETED_', ${userId}), deleted_date = now() WHERE id = ${userId}`;
    const [result, fields] = await promisePool.query(sql);
    return result;
  };