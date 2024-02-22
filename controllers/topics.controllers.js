const { selectAllTopics } = require("../models/topics.models")


exports.getAllTopics = (request, response, next) => {
    selectAllTopics().then((topics) => {
        response.status(200).send({topics});
    })
    .catch((err) => {
        console.log(err, "<err in topics model")
        next(err)
    })

}