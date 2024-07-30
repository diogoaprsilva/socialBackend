const promisePool = require('../../utils/connection');

exports.insertChatAdmin = async (senderId, receiverId, message) => {
    let sql = `INSERT INTO supportChat (senderId, receiverId, message) VALUES (?, ?, ?)`;
    const [result] = await promisePool.query(sql, [senderId, receiverId, message]);
    return result.insertId;
};

exports.getChatDataAdmin = async() => {
    let sql = `SELECT sc.id, sc.senderId, sc.receiverId, sc.message, DATE_FORMAT(DATE_ADD(sc.datetime, INTERVAL 330 MINUTE), '%d-%m-%Y') AS datetime, r.userName 
    FROM supportChat AS sc 
    LEFT JOIN userRegistration AS r ON sc.senderId = r.id 
    WHERE sc.senderId != 0 
    GROUP BY sc.senderId 
    ORDER BY sc.id DESC;
    `;
    const [result] = await promisePool.query(sql);
    return result;
};

exports.getChat = async(senderId) => {
    let sql = `SELECT senderId,receiverId,message,date_format(datetime,'%Y-%m-%d') as datetime FROM supportChat where (senderId=?) OR (receiverId=?)`;
    const [result] = await promisePool.query(sql,[senderId, senderId]);
    return result;
}

