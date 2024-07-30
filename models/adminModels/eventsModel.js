const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getEventsData = async () => {
    let sql = `SELECT e.id, e.name, e.description, e.image, e.eventPrice, e.location, e.mobileNumber, e.status, e.datetime, date_format(date_add(eventDate, interval 330 minute),'%d-%m-%Y') AS eventDate, e.fromTime, e.toTime, e.address, e.addedBy, ur.userName
      FROM events as e
      LEFT JOIN userRegistration AS ur ON ur.id = e.userId 
      WHERE e.isDeleted = 1 ORDER BY e.id DESC`;
    const [result] = await promisePool.query(sql);
    return result;
  };
  

exports.getEventsDataById = async(eventId, user_id) => {
    let sql = `SELECT id, name, description,concat('${config.imageUrl}',image) as imageUrl,date_format(date_add(eventDate, interval 330 minute),'%Y-%m-%d') AS eventDate, fromTime , toTime, isHighlights, address, image, eventPrice, eventDiscount, location, mobileNumber, datetime, status, COALESCE((SELECT 1 FROM eventParticipation WHERE userId = ${user_id} and eventId = ${eventId}),0) as isParticipate FROM events WHERE id= ? AND isDeleted = 1`;
    const [result] = await promisePool.query(sql, [eventId]);
    return result;
};

exports.getEventsDataByEventId = async(eventId) => {
    let sql = `SELECT id, name, description, image, address, location, eventDate, fromTime, toTime, eventPrice, eventDiscount, mobileNumber, status, isHighlights, date_format(date_add(eventDate, interval 330 minute),'%Y-%m-%d') AS eventDate from events WHERE id = ? AND isDeleted = 1`;

    const [result] = await promisePool.query(sql, [eventId]);
    return result;
}

exports.getEventsDataByIdByImage = async(id) => {
    let sql = `SELECT id, name, description, location, image, mobileNumber, datetime, status, eventDate, fromTime , toTime, address FROM events WHERE id= ?`;
     const [result] = await promisePool.query(sql, [id]);
    return result;
};

exports.insertEventsData = async(name, description, image, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId) => {
    let sql = `INSERT INTO events (name, description, image, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId, addedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await promisePool.query(sql, [name, description, image, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId, 1]);
    return result;
};

exports.updateEventsDataById = async(name, description, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId, id) => {
    let sql = `UPDATE events SET name= ?, description= ?, location= ?, eventPrice= ?, eventDiscount = ?, mobileNumber= ?, eventDate = ?, fromTime = ? , toTime = ?, address = ?, userId = ? WHERE id= ?`;
    const[result] = await promisePool.query(sql, [name, description, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId, id]);
    return result.affectedRows;
};

exports.updateEventsDataByIdImage = async(name, description, image, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId, id) => {
    let sql = `UPDATE events SET name= ?, description= ?, image= ?, location= ?, eventPrice= ?, eventDiscount = ?, mobileNumber= ?, eventDate = ?, fromTime = ? , toTime = ?, address = ?, userId = ? WHERE id= ?`;
    const[result] = await promisePool.query(sql, [name, description, image, location, eventPrice, eventDiscount, mobileNumber, eventDate, fromTime , toTime, address, userId, id]);
    return result.affectedRows;
};

exports.updateEventsStatusById = async(id) => {
    let sql = `UPDATE events SET status = (CASE status WHEN 1 THEN 0 ELSE 1 END) WHERE id= ?`;
    const [result] = await promisePool.query(sql, [ id]);
    return result;
}
