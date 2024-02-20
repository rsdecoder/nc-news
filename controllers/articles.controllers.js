const { selectArticlesById } = require("../models/articles.models")

exports.getArticlesById = (request, response, next) => {
    const { article_id } = request.params;
    selectArticlesById(article_id).then((article) => {
        response.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}
