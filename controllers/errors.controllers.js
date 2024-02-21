


exports.handleCustomErrors = (err, request, response, next) => {
    if(err.status && err.msg) {
        response.status(err.status).send({msg: err.msg})
    }
    next(err)
}

exports.handlePSQLErrors = (err, request, response, next) => {
    if(err.code = "22P02") {
        response.status(400).send({msg: 'Bad Request'})
    }
    next(err)
}