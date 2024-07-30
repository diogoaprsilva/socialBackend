const config = require('../config');
const promisePool = require('../utils/connection');

exports.getexpenseCalculatorList = async(userId,newDate,newDate1) => {
    let sql = `SELECT ec.id,ec.title,ec.amount,ec.type,u.userName FROM expenseCalculator as ec LEFT JOIN userRegistration as u ON u.id=ec.userId WHERE ec.userId=${userId} and type=1 and (date(datetime) BETWEEN "${newDate}" AND "${newDate1}") ORDER BY ec.id DESC`;

    let sql1 = `SELECT ec.id,ec.title,(ec.amount*-1) as amount,ec.type,u.userName FROM expenseCalculator as ec LEFT JOIN userRegistration as u ON u.id=ec.userId WHERE ec.userId=${userId} and type=2 and (date(datetime) BETWEEN "${newDate}" AND "${newDate1}") ORDER BY ec.id DESC`;

    let sqlFortotalPortfolio = `SELECT sum(amount) as totalPortfolio FROM expenseCalculator WHERE userId = ${userId} AND  (date(datetime) BETWEEN "${newDate}" AND "${newDate1}")`;
  
    const [result] = await promisePool.query(sql);
    const [result1] = await promisePool.query(sql1);
    const [resultFortotalPortfolio] = await promisePool.query(sqlFortotalPortfolio);
    
    return {
        result,
        result1,
        resultFortotalPortfolio
    };
}

exports.insertexpenseCalculator = async(data) => {
    let sql = `INSERT INTO expenseCalculator SET ?`;
    const [result] = await promisePool.query(sql, [data]);
    return result;
}



exports.getExpenseCalculatorbyId = async(data) => {
    let sql = `select * from expenseCalculator where id = ? and userId = ? `;
    const [result] = await promisePool.query(sql, [data.id, data.userId]);
  
    return result;
}

exports.updateExpenseCalculatorbyId = async(data) => {
    let sql = `update  expenseCalculator SET title= ?,amount=? where id = ? and userId = ? `;
    const [result] = await promisePool.query(sql, [data.title,data.amount, data.id, data.userId]);
    return result;
}


exports.deleteExpenseCalculatorbyId = async(data) => {
   
    let sql = `Delete from expenseCalculator where id = ? and userId = ? `;
    const [result] = await promisePool.query(sql,[data.id,data.userId]);
    return result

}

