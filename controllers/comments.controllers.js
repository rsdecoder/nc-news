const { selectCommentsById } = require("../models/comments.models")


exports.getCommentsByArticleId = (request, response, next) => {
    const { article_id } = request.params
    console.log(article_id)
    selectCommentsById(article_id)
    .then((comments) => {
        response.status(200).send({comments})
        
    })
    .catch((err) => {
        next(err)
    })
}