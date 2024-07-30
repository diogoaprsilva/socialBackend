const config = require('../config');
const promisePool = require('../utils/connection');

exports.getEventListData = async(id) => {
    let sql = `SELECT e.eventName, e.eventDescription, e.eventImages, e.eventPlace, r.userName as username FROM eventList as e LEFT JOIN userRegistration as r ON e.userId = r.id ORDER BY e.id DESC`;
    const [result] = await promisePool.query(sql);
    return result
}

exports.getEventListCheck = async(userId,data) => {
    let sql = `SELECT * FROM eventParticipation where userId=? and eventId =?`;
    const [result] = await promisePool.query(sql,[userId,data]);
    return result
}

exports.insertEventParticipation = async(data) => {
    
    let sql = `INSERT INTO eventParticipation SET ?`;
    const [result] = await promisePool.query(sql,[data]);
    return result
}

exports.updateEventRecipt = async(data) => {
    
    let sql = `update  eventParticipation SET receipt=? where userId = ? and eventId = ?`;
    const [result] = await promisePool.query(sql,[data.receipt,data.userId,data.eventId]);
    return result
}

exports.getPushNotificationsDetails = async() => {
    let sql = `SELECT id, userId, title, message, dateTime from pushNotifications ORDER BY id DESC`;
    const [result] = await promisePool.query(sql);
    return result;
}
