const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getPushNotificationsDetails = async() => {
    let sql = `SELECT id, userId, title, message, dateTime from pushNotifications WHERE 1`;
    const [result] = await promisePool.query(sql);
    return result;
},

exports.checkPushNotificationsDetails = async(title) => {
    let sql = `SELECT title from pushNotifications where title = ?`;
    const [result] = await promisePool.query(sql, [title])
    return result;
},

exports.insertPushNotifications = async(title, message, userId) => {
    let sql = `Insert INTO pushNotifications (title, message, userId) VALUES (?, ?, ?)`;
    const [result] = await promisePool.query(sql, [title, message, userId]);
    return result;
}