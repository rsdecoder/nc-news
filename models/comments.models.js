const db = require("../db/connection")

exports.selectCommentsById = (article_id) => {
    const sqlString = `SELECT * FROM comments WHERE article_id = $1
    ORDER BY comment_id DESC;`

    return db.query(sqlString, [article_id])
    .then((result)=>{
        return result.rows;
    })
}


exports.insertNewComment = (article_id, username, body ) => {

    if(!article_id || !username || !body){
        return Promise.reject({status: 400, msg: 'Bad Request'})
    }
    
    return db.query(`INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;`, [username, body, article_id])
    .then((result) => {
        return result.rows
    })
}

exports.removeCommentById = (comment_id) => {
    return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`,[comment_id])
    .then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'comment does not exist to be deleted'})
        }
        return result.rows;
    })
 
 
 }
 