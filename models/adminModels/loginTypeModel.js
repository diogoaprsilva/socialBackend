const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getUserDataBySuperAdmin = async(email) => {
    let sql = `SELECT id, email, userName FROM userRegistration WHERE email = ?`;
    const [result] = await promisePool.query(sql, [email]);
    return result
};

exports.checkUserName = async(userName) =>{
    let sql = 'SELECT id, userName FROM userRegistration WHERE userName = ? AND isAccountDeleted = 0';
    const [result] = await promisePool.query(sql,[userName])
    return result
}


exports.saveUserBySuperAdmin = async(data, registerBy) => {
    let sql = `INSERT INTO  userRegistration (userName, dateOfBirth, countryCodeId, mobileNumber, email, password, loginType, registerBy) VALUES (?, ?, ?, ?, ?, ?, ?, ? )`;
    const [result] = await promisePool.query(sql, 
        [data.userName, data.dateOfBirth, data.countryCodeId, data.mobileNumber, data.email, data.password, data.loginType, registerBy]);
    return result.affectedRows
}



exports.InsertActivity = async(activityData) => {
    let sql = `INSERT INTO activity (activity_type, user_id, ip) VALUES ('${activityData.activity_type}', '${activityData.user_id}', '${activityData.ip}')`;
    const [result] = await promisePool.query(sql);
    return result;
};

exports.updateUser = async(data, registerBy) => {
    let sql = `UPDATE userRegistration SET userName= ? , loginType= ?, registerBy=? WHERE id = ?`;
    const [result] = await promisePool.query(sql, [data.userName, data.loginType, registerBy, data.id]);
    return result.affectedRows;
}

exports.getVenderDetails = async() => {
    let sql = `SELECT ur.id, ur.userName, ur.isOfferFree, ur.userDocument, ur.email, ur.mobileNumber, ur.isBlock,ur.created_date as dateJoining, getOfferCreatedByVendor(ur.id) as offersCreated, contract.contractPdf from userRegistration as ur LEFT JOIN contract ON contract.userId = ur.id WHERE ur.loginType = ? AND ur.isAccountDeleted = 0 ORDER BY ur.id DESC`;
    const [result] = await promisePool.query(sql,[3]);
    return result;
};

exports.getSubAdminDetails = async() => {
    let sql = `SELECT ur.id, ur.userName, ur.userDocument, ur.dateOfBirth, ur.gender, ur.email, ur.mobileNumber, ur.isBlock as active, date_format(date_add(ur.created_date, interval 330 minute),'%Y-%m-%d') as datetime FROM userRegistration as ur WHERE loginType = ? AND isAccountDeleted = 0 ORDER BY ur.id DESC`;
    const [result] = await promisePool.query(sql, [2]);
    return result
};

exports.checkUser = async(id) => {
    let sql = `SELECT  userName, loginType FROM userRegistration WHERE id = ?`;
    const[result] = await promisePool.query(sql, [id]);
    return result
};

exports.getTeacherListDetails = async() => {
    let sql = `SELECT ur.id, ur.userName, ur.userDocument, ur.isVerified, date_format(date_add(ur.dateOfBirth, interval 330 minute),'%d-%m-%Y') AS dateOfBirth, ur.isBlock as Active, ur.gender, ur.email, ur.mobileNumber, getEventParticipationByUser(ur.id) as eventsBought, getTotalNumberOfUserRedeemOffer(ur.id) as offersUsed, getTotalSubscribed(ur.id) as subscibed from userRegistration as ur WHERE ur.loginType = ? AND ur.isAccountDeleted = 0 ORDER BY ur.id DESC`;
    const [result] = await promisePool.query(sql, [4]);
    return result;
};

exports.updateUserDetails = async(userName, id)=> {
    let sql = `UPDATE userRegistration SET userName= ? WHERE id = ?`;
    const [result] = await promisePool.query(sql, [userName, id]);
    return result.affectedRows;
};

exports.getUserListById = async(id) =>{
    let sql = `SELECT ur.id, ur.userName, date_format(date_add(dateOfBirth, interval 330 minute),'%Y-%m-%d') AS dateOfBirth, c.countryCode, ur.mobileNumber,  ur.email,  ur.isBlock,  ur.profilePic,  ur.gender,  ur.loginType,  ur.userName, date_format(date_add(created_date, interval 330 minute),'%Y-%m-%d') AS datetime
    FROM userRegistration ur
    LEFT JOIN country AS c ON c.id = ur.countryCodeId
    WHERE ur.id = ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result;
}

exports.isVerifiedUserById = async(isVerified, rejectReason, id) => {
    let sql = `UPDATE userRegistration SET isVerified = ?, rejectReason = ? WHERE id = ?`;
    const [result] = await promisePool.query(sql, [isVerified, rejectReason, id]);
    return result.affectedRows;
};

exports.getUserTeacherInfoById = async (id) => {
    let sql = `SELECT userName, email FROM userRegistration WHERE id = ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result; 
};

exports.getReferralListByUser = async(userId) => {
    let sql = `SELECT id, email, userName, referralCode , DATE_FORMAT(created_date, '%Y-%m-%d %H:%i:%s') as datetime FROM userRegistration WHERE referralId= ? AND isAccountDeleted = 0 ORDER BY id DESC`;
    const [result] = await promisePool.query(sql, [userId]);
    return result;
};

exports.getEventsParticipantsByUser = async(userId) => {
    let sql = `SELECT ep.id as eventId, ep.userId, ep.eventId, events.name as eventsName, events.description as eventsDescription, events.image as eventsImage, events.location as eventsLocation, events.eventPrice as eventsPrice, ep.cardNumber, ep.amount, ep.stripePayementId, ep.receiptUrl, ep.receipt, ep.datetime as planParticipationDate FROM eventParticipation as ep LEFT JOIN events ON ep.eventId = events.id LEFT JOIN userRegistration as ur ON ep.userId = ur.id where ep.userId = ? ORDER BY ep.id`;
    const [result] = await promisePool.query(sql, [userId]);
    return result;
};

exports.getTeacherFeedBack = async() => {
    let sql = `SELECT sr.id, sr.userId, sr.ticketNumber, ur.userName as teacher, sr.message as subject, sr.datetime from supportRequest as sr LEFT JOIN userRegistration as ur ON sr.userId = ur.id WHERE ur.loginType = ? ORDER BY sr.id DESC`;

    const [result] = await promisePool.query(sql, [4]);
    return result;
}

exports.getVendorFeedBack = async() => {
    let sql = `SELECT sr.id, sr.userId, sr.ticketNumber, ur.userName as vendorName, sr.message as subject, sr.datetime from supportRequest as sr LEFT JOIN userRegistration as ur ON sr.userId = ur.id WHERE ur.loginType = ? ORDER BY sr.id DESC`;
    const [result] = await promisePool.query(sql, [3]);
    return result
}