const { selectCommentsById, insertNewComment } = require("../models/comments.models")


exports.getCommentsByArticleId = (request, response, next) => {
    const { article_id } = request.params
    selectCommentsById(article_id)
    .then((comments) => {
        response.status(200).send({comments})
        
    })
    .catch((err) => {
        next(err)
    })
}


exports.postComment = (request, response, next) => {
    const {username, body} = request.body;
    const {article_id} = request.params;

    insertNewComment(article_id, username, body).then((Newcomment)=> {
        response.status(201).send({Newcomment});
    })
    .catch((err) => {      
        next(err)
    })
}