const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getMenuPermissionsDetails = async() => {
    let sql = `SELECT id, userId, dashBoard, events, offers, wellBeing, systemRole, systemResources, datetime FROM menuPermission WHERE 1`;
    const [result] = await promisePool.query(sql);
    return result;

}

exports.getMenuPermissionsDetailsByUserId = async(userId) => {
    let sql = `SELECT id, userId, dashBoard, userManagement, events, offers, wellBeing, communication, cms, systemRole, systemResources, date_format(date_add(datetime, interval 330 minute),'%Y-%m-%d') as datetime FROM menuPermission WHERE userId = ?`;
    const [result] = await promisePool.query(sql, [userId]);
    return result;

}

exports.insertMenuPermission = async(userId, dashBoard, userManagement,  events, offers, wellBeing, cms, systemRole, systemResources) => {
    let sql = `INSERT INTO menuPermission (userId, dashBoard, userManagement, events, offers, wellBeing, cms, systemRole, systemResources) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await promisePool.query(sql, [userId, dashBoard, userManagement, events, offers, wellBeing, cms, systemRole, systemResources]);
    return result;
};

exports.updateMenuPermissions = async( dashBoard, userManagement, events, offers, wellBeing, cms, systemRole, systemResources, userId) => {
    let sql = `UPDATE menuPermission SET dashBoard = ?, userManagement= ?, events = ?, offers = ?, wellBeing = ?, cms= ?, systemRole = ?, systemResources = ? WHERE userId = ?`;
    const [result] = await promisePool.query(sql,[ dashBoard, userManagement, events, offers, wellBeing, cms, systemRole, systemResources, userId]);
    console.log(result);
    return result;
}