const db = require("../db/connection")

exports.selectCommentsById = (article_id) => {
    const sqlString = `SELECT * FROM comments WHERE article_id = $1
    ORDER BY comment_id DESC;`

    return db.query(sqlString, [article_id])
    .then((result)=>{
        if(result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        console.log(result.rows)
        return result.rows;
    })
}