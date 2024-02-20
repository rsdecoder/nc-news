const fs = require("fs/promises")


// function selectAllApis () {
//     return fs.readFile('./endpoints.json')
//     .then((fileContents) => {
//         const parsedFileContents = JSON.parse(fileContents)
//         return parsedFileContents;
//     })
// }




module.exports = { selectAllApis };