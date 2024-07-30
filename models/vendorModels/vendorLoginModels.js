const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getVendorDetails = async(email) => {
    let sql = `SELECT  id, userName, isBlock, dateOfBirth, mobileNumber, email, password, loginType  FROM userRegistration WHERE email= ? AND loginType IN (?) AND isAccountDeleted = 0`;
    const [result] = await promisePool.query(sql, [email, 3]);
    return result;
},

exports.vendorInsertActivity = async(activityData) => {
    let sql = `INSERT INTO activity (activity_type, user_id, ip) VALUES ('${activityData.activity_type}', '${activityData.user_id}', '${activityData.ip}')`;
    const [result] = await promisePool.query(sql);
    return result;
},

exports.getVendorProfilePIc = async(email) => {
    let sql =  `SELECT id, userName, email, mobileNumber, profilePic FROM userRegistration WHERE email = ? AND loginType IN (?)`;
    const [result] = await promisePool.query(sql, [email, 3]);
    return result;
},

exports.getVendorProfileByUserId = async(userId) => {
    let sql = `SELECT userName, mobileNumber, profilePic FROM userRegistration WHERE id = ?`;
    const [result] = await promisePool.query(sql, [userId]);
    return result;
}

exports.updateVendorPassword = async(newPassword, email) => {
    let sql = `UPDATE userRegistration SET password = ? WHERE email = ?`;
    const [result] = await promisePool.query(sql, [newPassword, email]);
    return result;
},


exports.updateVendorProfile = async(userName, mobileNumber, profilePic, userId) => {
    let sql = `UPDATE userRegistration SET userName=? , mobileNumber= ?, profilePic=?  WHERE id = ?`;
    const [result] = await promisePool.query(sql, [userName, mobileNumber, profilePic, userId]);
    return result.affectedRows;
}