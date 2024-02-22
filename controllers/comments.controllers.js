const { selectCommentsById, insertNewComment, removeCommentById } = require("../models/comments.models")


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

    insertNewComment(article_id, username, body).then((newcomment)=> {
        response.status(201).send({newcomment});
    })
    .catch((err) => {      
        next(err)
    })
}

exports.deleteCommentById = (request, response, next) => {
    const { comment_id } = request.params;
    removeCommentById(comment_id).then(()=> {
        response.status(204).send()
    })
    .catch((err) => {
        next(err)
    })
 }
 