const fs = require("fs")

//Generate new id for the about to insert purchase activity
const getNewId = (array) => {
    console.log(array)
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

//Insert new purchase activity into backend
function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }else{
            console.log("writing in", content)
        }
    })
}
module.exports = {
    getNewId,
    writeJSONFile
}