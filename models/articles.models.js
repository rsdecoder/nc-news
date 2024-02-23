const db = require("../db/connection");

exports.selectArticlesById = (article_id) => {
  let sqlString = `SELECT articles.*, 
  CAST(COUNT(comments.article_id) AS INTEGER ) AS comment_count  
  FROM articles
  LEFT JOIN comments ON comments.article_id = articles.article_id
  WHERE articles.article_id = $1
  GROUP BY articles.article_id
  ORDER BY created_at DESC;`;

  return db
    .query(sqlString, [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }
      return result.rows;
    });
};

exports.selectAllArticles = (topic) => {

  function queryArticles () {
    const queryVals = [];
      let sqlString = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url,
      CAST(COUNT(comments.article_id) AS INTEGER ) AS comment_count  
      FROM articles
      LEFT JOIN comments ON comments.article_id = articles.article_id`;
    
      if (topic) {
        queryVals.push(topic);
        sqlString += ` WHERE topic = $1`;
      }
    
      return db.query(sqlString +` GROUP BY articles.article_id
      ORDER BY created_at DESC;`, queryVals)
      .then((result) => {
        return result.rows;
      });
  }

  if(!topic) {
    return queryArticles()
  }

  const checkIfTopicExits = `SELECT * FROM topics WHERE slug = $1;`;

  return db.query(checkIfTopicExits,[topic])
  .then((result) => {
    if(result.rows.length === 0){
      return Promise.reject({status: 404, msg: 'topic does not exist'})
    }
    else {
      return queryArticles()
    }
  }) 
};

exports.updateArticleById = (article_id, inc_votes) => {
  const sqlString = `UPDATE articles
   SET votes =  votes + $1
   WHERE article_id = $2
   RETURNING *;`;
  if (!inc_votes) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db.query(sqlString, [inc_votes, article_id]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "article does not exist to update",
      });
    }
    return result.rows;
  });
};
