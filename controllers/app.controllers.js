//const {selectAllApis } = require("../models/app.models")
const  endpoints  = require("../endpoints.json")


function getHealthCheck (request, response) {

    response.status(200).send();
}
// function getAllApis (request, response) {
    
//     selectAllApis().then((endpoints)=> { 
//         response.status(200).send(endpoints)
        
//     })
// }
function getAllApis (request, response) {
    
    response.status(200).send(endpoints)
}

module.exports = { getHealthCheck, getAllApis };