const config = require("../config");
const promisePool = require("../utils/connection");

exports.getUsersDetails = async (email) => {
  let sql = `SELECT id, isAccountDeleted, userName, mobileNumber,isBlock,referralCode,userDocument,concat('${config.imageUrl}',userDocument) as userDocumentUrl, email,password, gender,concat('${config.imageUrl}',profilePic) as imageUrl, profilePic FROM userRegistration WHERE email = ? AND loginType = 4`;
  const [result] = await promisePool.query(sql, [email]);
  return result;
};

exports.getUsersDetailsSmartPin = async (data) => {
  let sql = `SELECT id, userName, isAccountDeleted, mobileNumber, email,password, gender, profilePic FROM userRegistration WHERE UPPER(smartPin)  = UPPER(?)`;
  const [result] = await promisePool.query(sql, [data]);
  return result;
};



exports.checkemailExistForOTP = async (emailOrMobile) => {
  let sql = `SELECT * FROM otpCheckUser where email = ?`;
  const [result, fields] = await promisePool.query(sql, [emailOrMobile]);
  return result;
};

exports.updateOTP = async (data) => {
  let sql = `UPDATE otpCheckUser SET otp =? where email = ?`;
  const [result, fields] = await promisePool.query(sql, [data.otp, data.email]);
  return result;
};

exports.insertOTP = async (data) => {
  let sql = `INSERT INTO otpCheckUser(email, otp) VALUES(?, ?)`;
  const [result, fields] = await promisePool.query(sql, [data.email, data.otp]);
  return result;
};

exports.checkmobileExistForOTP = async (emailOrMobile) => {
  let sql = `SELECT * FROM otpCheckUser where mobileNumber = ?`;
  const [result, fields] = await promisePool.query(sql, [emailOrMobile]);

  return result;
};

exports.updateOTPUsingMobile = async (data) => {
  let sql = `UPDATE otpCheckUser SET otp = ? where mobileNumber = ?`;
  const [result, fields] = await promisePool.query(sql, [
    data.otp,
    data.mobileNumber,
  ]);
  return result;
};

exports.insertOTPUsingMobile = async (data) => {
  let sql = `INSERT INTO otpCheckUser(mobileNumber, otp) VALUES(?,?)`;

  const [result, fields] = await promisePool.query(sql, [
    data.mobileNumber,
    data.otp,
  ]);

  return result;
};

exports.updatePasswordByMobile = async (hash, emailOrMobile) => {
  let sql = `UPDATE userRegistration SET password = ? WHERE mobileNumber =  `;
  const [result, fields] = await promisePool.query(sql, [hash, emailOrMobile]);
  return result.affectedRow1s;
};

exports.updatePasswordByEmail = async (hash, emailOrMobile) => {
  let sql = `UPDATE userRegistration SET password = ? WHERE email = ? `;
  const [result, fields] = await promisePool.query(sql, [hash, emailOrMobile]);
  return result.affectedRow1s;
};

exports.getUsersMobileDetails = async (mobileNumber) => {
  let sql = `SELECT * FROM userRegistration where mobileNumber = ?`;
  const [result] = await promisePool.query(sql, [mobileNumber]);

  return result;
};

exports.getUsersReferralCode = async (referralCode) => {
  let sql = `SELECT id,referralCode FROM userRegistration where referralCode = ?`;
  const [result, fields] = await promisePool.query(sql, [referralCode]);

  return result;
};

exports.getReferralUsersCount = async (referralId) => {
  let sql = `SELECT COUNT(id) as referralCount FROM userRegistration WHERE referralId=?`;
  const [result, fields] = await promisePool.query(sql, [referralId]);

  return result;
};



exports.checkUserRegister = async (emailOrMobile) => {
  let sql = `SELECT * FROM userRegistration where email = ? AND loginType = 4`;
  const [result, fields] = await promisePool.query(sql, [emailOrMobile]);
  return result;
};

exports.checkemailExistForOTP = async (emailOrMobile) => {
  let sql = `SELECT * FROM otpCheckUser where email = ?`;
  const [result, fields] = await promisePool.query(sql, [emailOrMobile]);
  return result;
};

exports.checkmobileExistForOTP = async (emailOrMobile) => {
  let sql = `SELECT * FROM otpCheckUser where mobileNumber = ?`;
  const [result, fields] = await promisePool.query(sql, [emailOrMobile]);
  return result;
};

exports.checkUserRegisterMobile = async (emailOrMobile, countryCodeId) => {
  let sql = `SELECT id, userName, isAccountDeleted, mobileNumber,isBlock,referralCode,userDocument,concat('${config.imageUrl}',userDocument) as userDocumentUrl, email,password, gender,concat('${config.imageUrl}',profilePic) as imageUrl, profilePic FROM userRegistration WHERE mobileNumber = ? AND countryCodeId = ? AND loginType = 4`;
  const [result, fields] = await promisePool.query(sql, [emailOrMobile, countryCodeId]);
  return result;
};

exports.checkEmail = async (email) => {
  let sql = `SELECT email FROM userRegistration WHERE email = ?`;
  const [result] = await promisePool.query(sql, [email]);
  return result;
};

exports.updateFCMToken = async (FCM_token, email) => {
  let sql = `UPDATE userRegistration SET FCM_token =? WHERE email = ? `;
  const [result, fields] = await promisePool.query(sql, [FCM_token, email]);
  return result.affectedRow1s;
};

exports.saveUserDetails = async (data) => {
  let sql = `INSERT INTO  userRegistration (userName,referralCode,referralId,referBy, mobileNumber,dateOfBirth,email, password,smartPin,googleAuthCode,QRCode,userDocument,gender,isEmailVerify, isSmsVerify,signupBy, countryCodeId, loginType, countryIsoCode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const [result] = await promisePool.query(sql, [
    data.userName,
    data.referralCode,
    data.referralId,
    data.referBy,
    data.mobileNumber,
    data.dateOfBirth,
    data.email,
    data.password,
    data.smartPin,
    data.googleAuthCode,
    data.QRCode,
    data.userDocument,
    data.gender,
    data.isEmailVerify,
    data.isSmsVerify,
    data.signupBy,
    data.countryCodeId,
    data.loginType,
    data.countryIsoCode
  ]);
  return result;
};

exports.insertActivity = async (activityData) => {
  let sql = `INSERT INTO activity(activity_type, user_id, ip) VALUES( '${activityData.activity_type}'  , '${activityData.user_id}', '${activityData.ip}' ) `;
  const [result, fields] = await promisePool.query(sql);
  return result.insertId;
};

exports.checkUserOldPassword = async (oldHashPassword, user_id) => {
  const sql = `SELECT password FROM userRegistration WHERE id =? AND password = ?`;
  const [result, fields] = await promisePool.query(sql, [
    user_id,
    oldHashPassword,
  ]);
  return result;
};

exports.updateUserNewPassword = async (newHashPassword, user_id) => {
  let sql = `UPDATE userRegistration SET  password = ? WHERE id = ?`;
  const [result, fields] = await promisePool.query(sql, [newHashPassword, user_id]);
  return result;
};

exports.getUsersDetailsById = async (id) => {
  let sql = `SELECT id, isVerified, countryCodeId,countryIsoCode, userName,date_format(dateOfBirth,'%d/%m/%Y') as dateOfBirth , mobileNumber, email,referralCode,userDocument,concat('${config.imageUrl}',userDocument) as userDocumentUrl, gender,profilePic, concat('${config.imageUrl}',profilePic) as imageUrl FROM userRegistration  where id = ?`;
  const [result, fields] = await promisePool.query(sql, [id]);
  return result;
};

exports.checkUserEmailAndMobile = async (data, user_id) => {
  let emailSql = `SELECT id, email FROM userRegistration WHERE email = ? AND id != ?`;
  let mobileSql = `SELECT id, mobileNumber FROM userRegistration WHERE mobileNumber = ? AND id != ?`;

  const [emailResult, emailFields] = await promisePool.query(emailSql, [data.email, user_id]);
  const [mobileResult, mobileFields] = await promisePool.query(mobileSql, [data.mobileNumber, user_id]);

  let errors = {};

  if (emailResult.length > 0) {
    errors.msg = 'Email already exists';
  }

  if (mobileResult.length > 0) {
    errors.msg = 'Mobile number already exists';
  }

  return errors;
};


exports.updateProfile = async (reqData, user_id) => {
  let sql = `UPDATE userRegistration SET ?  WHERE id = ${user_id}`;
  const [result, fields] = await promisePool.query(sql, [reqData, user_id]);
  return result.affectedRows;
};

exports.updateFCMTokenByUserId = async (FCM_token, user_id) => {
  let sql = `UPDATE userRegistration SET  FCM_token = '${FCM_token}' WHERE id = ${user_id}`;
  const [result, fields] = await promisePool.query(sql);
  return result
}

exports.getReferralUsersList = async (user_id) => {
  let sql = `SELECT id, email, userName, referralCode , DATE_FORMAT(created_date, '%Y-%m-%d %H:%i:%s') as datetime FROM userRegistration  WHERE referralId=? ORDER BY id DESC `;
  const [result, fields] = await promisePool.query(sql, [user_id]);
  return result;
};

exports.insertSubscriptionPlan = async (data) => {
  let sql = `INSERT INTO planSubscription SET ?`;
  const [result, fields] = await promisePool.query(sql, [data]);
  return result.insertId;
};

exports.getSubscriptionPlan = async (userId) => {
  let sql = `SELECT * FROM planSubscription WHERE userId=? and status=1`;
  const [result, fields] = await promisePool.query(sql, [userId]);
  return result;
};

exports.subscriptionPlanDetail = async (data) => {
  let sql = `SELECT * FROM subscriptionDetail where id= 1 `;
  const [result, fields] = await promisePool.query(sql);

  return result;
};


exports.checkCard = async (data, userId) => {
  let sql = `SELECT * FROM cardDetails where id=? and userId=?`;
  const [result] = await promisePool.query(sql, [data.cardId, userId]);

  return result;
};

exports.insertChat = async (data) => {
  let sql = `INSERT INTO supportChat SET ? `;
  const [result, fields] = await promisePool.query(sql, [data]);
  return result.insertId;
};

exports.getChat = async (user_id) => {
  let sql = `SELECT senderId,receiverId,message,date_format(datetime,'%Y-%m-%d') as datetime FROM supportChat where (senderId=?) OR (receiverId=?) `;
  const [result, fields] = await promisePool.query(sql, [user_id, user_id]);
  return result;
};

exports.insertSupportRequest = async (data) => {
  let sql = `INSERT INTO supportRequest SET ? `;
  const [result, fields] = await promisePool.query(sql, [data]);
  return result.insertId;
};


exports.getSupportRequest = async (userId) => {

  let sql = `SELECT * FROM supportRequest where userId=? `;
  const [result, fields] = await promisePool.query(sql, [userId]);
  return result;
};


exports.getUserOfferList = async (user_id) => {
  let sql = `SELECT rd.redeemCode,o.offerName,o.offerDescription,o.offerPrice,o.offerPercent,o.offerType,o.offerPercent,u.userName FROM redeemOffer as rd LEFT JOIN offersList as o ON o.id=rd.offerId LEFT JOIN userRegistration as u on u.id=rd.userId WHERE rd.userId=? `;
  const [result, fields] = await promisePool.query(sql, [user_id]);
  return result;
};

exports.getPlanList = async (user_id) => {
  let sql = `SELECT ps.amount as planAmount,ps.type,ps.stripePayementId,ps.receiptUrl,ps.cardNumber,u.userName FROM planSubscription as ps LEFT JOIN userRegistration as u ON u.id=ps.userId WHERE ps.userId=? `;
  const [result, fields] = await promisePool.query(sql, [user_id]);
  return result;
};

exports.getReferralDetail = async (user_id) => {
  let sql = `SELECT yourAmount,friendAmount,referralCode FROM referralManagement CROSS JOIN userRegistration as u WHERE u.id=? `;
  const [result, fields] = await promisePool.query(sql, [user_id]);
  return result;
};

exports.updateEmailForgotOTP = async (otp, emailOrMobile) => {
  let sql = `UPDATE userRegistration SET forgotOtp =? where email = ?`;
  const [result, fields] = await promisePool.query(sql, [otp, emailOrMobile]);
  return result;
};

exports.updateMobileForgotOTP = async (otp, emailOrMobile) => {
  let sql = `UPDATE userRegistration SET forgotOtp =? where mobileNumber = ?`;
  const [result, fields] = await promisePool.query(sql, [otp, emailOrMobile]);
  return result;
};

exports.checkSubscription = async () => {
  let sql = `SELECT * FROM planSubscription where status=1`;
  const [result, fields] = await promisePool.query(sql);
  return result;
};

exports.updateSubscription = async () => {
  let sql = `update planSubscription SET  status=0 where now() > endTime `;
  const [result, fields] = await promisePool.query(sql);
  return result;
};


exports.getAllEventsDetail = async (data, type) => {
  let sql = `SELECT id,name,description,concat('${config.imageUrl}',image) as imageUrl,date_format(date_add(eventDate, interval 330 minute),'%Y-%M-%a') AS eventDate, date_format(date_add(eventDate, interval 330 minute),'%d') AS eventDate, date_format(date_add(eventDate, interval 330 minute),'%M') AS eventMonth, date_format(date_add(eventDate, interval 330 minute),'%a') AS eventDay, fromTime , toTime, address, location,eventPrice, eventDiscount, mobileNumber,datetime FROM events where isDeleted = 1 ORDER BY id DESC `;

  const [result, fields] = await promisePool.query(sql);
  return result;
};

exports.checkIsPlanSubscribe = async(userId) =>{
  let sql = `SELECT * FROM planSubscription WHERE userId = ? And status = 1`;
  const [result, fields] = await promisePool.query(sql, [userId]);
  return result;
}

exports.getUserSubscriptionDetail = async (userId) => {
  let sql = `SELECT  p.id as planDetail, s.id, s.name, s.description, s.subscriptionType,p.amount, s.validity , s.status,s.datetime from planSubscription as p LEFT join subscriptionDetail as s ON p.planId = s.id where p.userId = ?`;
  const [result, fields] = await promisePool.query(sql, [userId]);
  return result;
};

exports.getplanData = async (userId) => {
  let sql = `SELECT *, null as planDetail FROM subscriptionDetail WHERE id = 1`;
  const [result, fields] = await promisePool.query(sql);
  return result;
};

exports.paymentHistory = async (userId, type) => {
  let sql = '';
  if (parseInt(type) == 1) {
    sql = `SELECT ps.id, sp.subscriptionType, CONCAT(ps.amount, ' AED') as amount, DATE_FORMAT(ps.startTime, '%d-%M-%Y %H:%i:%s') as startDate, DATE_FORMAT(ps.endTime, '%d-%M-%Y %H:%i:%s') as endDate, DATE_FORMAT(ps.datetime, '%d-%M-%Y %H:%i:%s') as datetime FROM planSubscription as ps LEFT JOIN subscriptionDetail as sp ON ps.planId = sp.id WHERE ps.userId = ? ORDER BY ps.id DESC`;
  } else {
    sql = `SELECT e.name as eventName, ep.id, CONCAT(ep.amount, ' AED') as amount, DATE_FORMAT(ep.datetime, '%d-%M-%Y %H:%i:%s') as datetime FROM eventParticipation as ep LEFT JOIN events as e ON ep.eventId = e.id WHERE ep.userId = ? ORDER BY ep.id DESC`;
  }
  const [result, fields] = await promisePool.query(sql, [userId]);
  return result;
};

exports.accountDelete = async (userId) => {
  let sql = `UPDATE userRegistration SET isAccountDeleted = 1, email = CONCAT(email, '_DELETED_', ${userId}), mobileNumber = CONCAT(mobileNumber, '_DELETED_', ${userId}), deleted_date = now() WHERE id = ${userId}`;
  const [result, fields] = await promisePool.query(sql);
  return result;
};

exports.updateDocument= async(userDocument, user_id) => {
  let sql = `UPDATE userRegistration SET userDocument = ?, isVerified = ? WHERE id = ?`;
  const [result] = await promisePool.query(sql, [userDocument, 0, user_id]);
  return result
}


exports.countryCodeList = async () => {
  let sql = `SELECT id, countryCode, name, iso	 FROM country`;
  const [result, fields] = await promisePool.query(sql);
  return result;
};



// }

// module.exports = new UserModel;
