const filename = './data/history.json';
const historyRecords = require(filename);
const helper = require('./helper.js');

function gethistoryRecords() {
    return new Promise((resolve, reject) => {
        if (historyRecords.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }
        resolve(historyRecords)
    })
}

function inserthistoryRecord(newhistoryRecord) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(historyRecords) }
        newhistoryRecord = { ...id, ...newhistoryRecord }
        historyRecords.push(newhistoryRecord)
        helper.writeJSONFile(filename, historyRecords)
        resolve(newhistoryRecord)
    })
}

module.exports = {
    inserthistoryRecord,
    gethistoryRecords
}