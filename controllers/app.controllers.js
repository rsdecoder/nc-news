

function getHealthCheck (request, response) {

    response.status(200).send();
}

module.exports = { getHealthCheck };