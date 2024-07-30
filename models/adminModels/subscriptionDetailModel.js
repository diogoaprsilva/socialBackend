const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getSubscriptionList = async() => {
    let sql = `SELECT name, description, subscriptionType, amount, validity , status, id, datetime from subscriptionDetail`;
    const [result] = await promisePool.query(sql);
    return result;
}

exports.insertPlanDetail = async(name, description, subscriptionType, amount, validity) => {
    let sql = `Insert INTO subscriptionDetail (name, description, subscriptionType, amount, validity) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await promisePool.query(sql, [name, description, subscriptionType, amount, validity]);
    return result;
}

exports.updateSubscriptionDetail = async(name, description, subscriptionType, amount, validity, id) => {
    let sql = `UPDATE subscriptionDetail SET name = ?, description = ?, subscriptionType = ?, amount = ?, validity = ? WHERE id = ? `;
    const [result] = await promisePool.query(sql, [name, description, subscriptionType, amount, validity, id]);
    return result;
}

exports.updateSubscriptionStatus = async(data) => {
    let sql = `UPDATE subscriptionDetail SET status = ? WHERE id = ? `;
    const [result] = await promisePool.query(sql, [data.status, data.id]);
    return result;
}