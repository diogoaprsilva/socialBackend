const config = require('../../config');
const promisePool = require('../../utils/connection');

exports.getWellBeingsBlogData = async() => {
    let sql = `SELECT wbb.id as postId, wbb.name as title, wbc.name as category, ur.userName as postedBy, wbb.status as active, date_format(date_add(wbb.datetime, interval 330 minute),'%Y-%m-%d') as datetime FROM wellBeingsBlog as wbb LEFT JOIN wellBeingsCategory as wbc ON wbb.wellBeingsCategoryId = wbc.id LEFT JOIN userRegistration as ur ON wbb.userId = ur.id ORDER BY wbb.id DESC`;
    const [result] = await promisePool.query(sql);
    return result;
}

exports.getWellBeingsBlogDataByName = async(name) => {
    let sql = `SELECT id,name, description, image, backgroundImage FROM wellBeingsBlog WHERE name= ? AND isDeleted = 1`;
    const [result] = await promisePool.query(sql, [name]);
    return result
}

exports.getWellBeingsBlogDataById = async(id) => {
    let sql = `SELECT id, wellBeingsCategoryId, name, description,concat('${config.imageUrl}',image) as imageUrl, image,concat('${config.imageUrl}',backgroundImage) as backgroundImageUrl, backgroundImage, status FROM wellBeingsBlog WHERE id= ?`;
    const [result] = await promisePool.query(sql, [id]);
    return result
}

exports.insertWellBeingsBlogData = async(name, description, image, backgroundImage, wellBeingsCategoryId, userId) => {
    let sql = `INSERT INTO wellBeingsBlog (name, description, image, backgroundImage, wellBeingsCategoryId,userId) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await promisePool.query(sql, [name, description, image, backgroundImage, wellBeingsCategoryId, userId]);
    return result;
}

exports.updateWellBeingsBlogData = async(name, description, wellBeingsCategoryId, id) => {
    let sql = `UPDATE wellBeingsBlog SET name = ?, description = ?, wellBeingsCategoryId= ? WHERE id = ?`;
    const [result] = await promisePool.query(sql, [name, description, wellBeingsCategoryId, id]);
    return result.affectedRows;
}

exports.updateWellBeingsBlogDataImages = async(name, description, wellBeingsCategoryId, image, backgroundImage, id) => {
    console.log(name, description, wellBeingsCategoryId, image, backgroundImage, id,'.................');
    let sql = `UPDATE wellBeingsBlog SET name = ?, description = ?, wellBeingsCategoryId =?,  image = ?, backgroundImage = ? WHERE id = ?`;
    const [result] = await promisePool.query(sql, [name, description, wellBeingsCategoryId, image, backgroundImage, id]);
    return result.affectedRows;
}



exports.wellBeingsBlodStatusChangeById = async(id) => {
    let sql = `UPDATE wellBeingsBlog SET status = (CASE status WHEN 1 THEN 0 ELSE 1 END) WHERE id=?`;
    const [result] = await promisePool.query(sql, [id]);
    return result;
}

exports.getWellBeingsBlogDataByCategory = async() => {
    let sql = `SELECT wel.id, wc.id as wellBeingsCategoryId, wel.name, wel.image, wel.description, wel.datetime as wellBeingsBlogDatetime, wc.name as wellBeingsCategoryName from wellBeingsBlog as wel LEFT JOIN wellBeingsCategory as wc ON wel.wellBeingsCategoryId = wc.id`;
    const [result] = await promisePool.query(sql);
    return result;
}

exports.getWellBeingsByCategoryId = async(data) => {
    let sql = `SELECT wel.id,wel.name, wel.description,concat('${config.imageUrl}',image) as imageUrl,concat('${config.imageUrl}',backgroundImage) as backgroundImageUrl, wel.datetime as wellBeingsBlogDatetime, wc.name as wellBeingsCategoryName from wellBeingsBlog as wel LEFT JOIN wellBeingsCategory as wc ON wel.wellBeingsCategoryId = wc.id where 1`;
    if(data.categoryId > 1){
        sql += ` AND wc.id=?`
    }
    const [result] = await promisePool.query(sql,[data.categoryId]);
    return result;
}