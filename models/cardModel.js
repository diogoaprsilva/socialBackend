
const promisePool = require('../utils/connection');


exports.saveCardDetails = async(data) => {
    let sql = `INSERT INTO  cardDetails (userId, cardNumber,nameOnCard,expiryMonth, expiryYear,postalCode) VALUES (?,?,?,?,?,?)`; 
    const [result] = await promisePool.query(sql,[data.userId, data.cardNumber,data.nameOnCard,data.expiryMonth, data.expiryYear,data.postalCode]);
    return result;
}

exports.getCardDetailsByNumber =  async (userId,cardNumber) => {
  let sql = `select * from cardDetails where  userId = ? and  cardNumber = ? and status =0`;
  const [result, fields] = await promisePool.query(sql, [userId,cardNumber]);
  return result;
}
exports.getCardDetails= async (userId) => {
    let sql = `select * from cardDetails where userId = ? and status =0`;
    const [result, fields] = await promisePool.query(sql, [userId]);
    return result;
  }


exports.getCardDetailsById= async (Id) => {
    let sql = `select * from cardDetails where Id = ? and status =0`;
    const [result, fields] = await promisePool.query(sql, [Id]);
    return result;
  }

exports.deleteCardDetailsById = async (Id) => {
    let sql = `update cardDetails SET status=1  where Id = ? `;
    const [result, fields] = await promisePool.query(sql, [Id]);
    return result;
  }
