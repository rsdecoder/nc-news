const { selectArticlesById , selectAllArticles, updateArticleById} = require("../models/articles.models")

exports.getArticlesById = (request, response, next) => {
    const { article_id } = request.params;
    selectArticlesById(article_id).then((article) => {
        response.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}

exports.getAllArticles = (request, response, next) => {
    const { topic, sort_by, order } = request.query;
    console.log(sort_by, "<<<controller")
    selectAllArticles(topic, sort_by, order).then((articles) => {
        response.status(200).send({articles});
    })
    .catch((err) => {
        next(err)
    }) 
}



exports.patchArticleById = (request, response, next) => {
    const { article_id } = request.params;
    const {inc_votes}  = request.body;
    updateArticleById(article_id, inc_votes).then((updatedArticle) => {
        response.status(200).send({updatedArticle})
    })
    .catch((err) => {
        next(err)
    })
    
}