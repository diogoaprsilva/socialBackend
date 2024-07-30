const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getVenodrEventsListById = async(vendorId) => {
    let sql = `SELECT id, name, description, image, eventPrice, location, mobileNumber, status, datetime, date_format(date_add(eventDate, interval 330 minute),'%d-%m-%Y') AS eventDate, fromTime , toTime, address FROM events WHERE userId = ? AND isDeleted = 1 ORDER BY id DESC `;
    const [result] = await promisePool.query(sql,[vendorId]);
    return result;
}

exports.getEventsDataById = async(eventId, user_id) => {
    let sql = `SELECT id, name, description,concat('${config.imageUrl}',image) as imageUrl,date_format(date_add(eventDate, interval 330 minute),'%Y-%m-%d') AS eventDate, fromTime , toTime, isHighlights, address, image, eventPrice, location, mobileNumber, datetime, status, COALESCE((SELECT 1 FROM eventParticipation WHERE userId = ${user_id} and eventId = ${eventId}),0) as isParticipate FROM events WHERE id= ?`;
    const [result] = await promisePool.query(sql, [eventId]);
    return result;
};

exports.getEventsDataByEventId = async(eventId) => {
    let sql = `SELECT id, name, description, image, address, location, eventDate, fromTime, toTime, eventPrice, eventDiscount, mobileNumber, status, isHighlights, date_format(date_add(eventDate, interval 330 minute),'%Y-%m-%d') AS eventDate from events WHERE id = ?`;
    const [result] = await promisePool.query(sql, [eventId]);
    return result;
}

exports.getEventsDataByIdByImage = async(id) => {
    let sql = `SELECT id, name, description, location, image, mobileNumber, datetime, status, eventDate, fromTime , toTime, address FROM events WHERE id= ?`;
     const [result] = await promisePool.query(sql, [id]);
    return result;
};

exports.insertEventsDataByVendor = async(name, description, image, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId) => {
    let sql = `INSERT INTO events (name, description, image, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId, addedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await promisePool.query(sql, [name, description, image, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId, 2]);
    return result;
};

exports.updateEventsDataById = async(name, description, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId, id) => {
    let sql = `UPDATE events SET name= ?, description= ?, location= ?, eventPrice= ?, eventDiscount = ?, mobileNumber= ?, eventDate = ?, fromTime = ? , toTime = ?, address = ?,  userId = ? WHERE id= ?`;
    const[result] = await promisePool.query(sql, [name, description, location, eventPrice, eventDiscount,mobileNumber, eventDate, fromTime , toTime, address, userId, id]);
    return result.affectedRows;
};

exports.updateEventsDataByIdImage = async(name, description, image, location, eventPrice,eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId, id) => {
    let sql = `UPDATE events SET name= ?, description= ?, image= ?, location= ?, eventPrice= ?, eventDiscount = ?, mobileNumber= ?, eventDate = ?, fromTime = ? , toTime = ?, address = ?, userId = ? WHERE id= ?`;
    const[result] = await promisePool.query(sql, [name, description, image, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId, id]);
    return result.affectedRows;
};

exports.updateEventsStatusById = async(id) => {
    let sql = `UPDATE events SET status = (CASE status WHEN 1 THEN 0 ELSE 1 END) WHERE id= ?`;
    const [result] = await promisePool.query(sql, [ id]);
    return result;
}

exports.getContractDetails = async() => {
    let sql = `SELECT id, userId, contractPdf, status, date_format(date_add(datetime, interval 330 minute),'%Y-%m-%d') as datetime FROM contract`;
    const [result] = await promisePool.query(sql);
    
    return result;
};
