
exports.handleCustomErrors = (err, request, response, next) => {
    if(err.code === undefined && err.status && err.msg) {
        response.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
}

exports.handlePSQLErrors = (err, request, response, next) => {
    if(err.code === "22P02") {
        response.status(400).send({msg: 'Bad Request'})
    }
    else if(err.code === "23503" || err.code === "23502") {
        response.status(404).send({msg: 'Not Found'})
    }
    else {
        response.status(500).send({msg: 'Internal server error'})
    }
    
}