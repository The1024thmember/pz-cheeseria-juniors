import * as express from 'express';

const cheeses = require('./data/cheeses.json');

//path where history is stored
const filename = './history.json';
const historyRecords = require('../../history.json');

const helper = require('./helper.js');
const router = express.Router();

/********************Router function**********************/
/* Get all cheese  API */
router.get('/api/cheeses', (req, res, next) => {
    res.json(cheeses);
});

/* Get all history API */
router.get('/api/history', async (req, res) => {
    await gethistoryRecords()
    .then((posts:any) => res.json(posts))
    .catch((err:any) => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new history API*/
router.post('/api/history',  async (req, res) => {
    await inserthistoryRecord(req.body)
    .then((post:any) => res.status(201).json({
        message: `The post #${post.id} has been updated`,
        content: post
    }))
    .catch((err:any) => res.status(500).json({ message: err.message }))
})


/********************Helper function**********************/
/* Get all history records from backend (history.json) */
function gethistoryRecords() {
    return new Promise((resolve, reject) => {
        resolve(historyRecords)
    })
}

/* Insert new purchase History into backend (history.json) */
function inserthistoryRecord(newhistoryRecord:object) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return new Promise((resolve,reject) => {
        try{
            const id =  helper.getNewId(historyRecords)
            const temp = { "id": id, "date":dateTime, "goods": newhistoryRecord }
            historyRecords.push(temp)
            helper.writeJSONFile(filename,historyRecords)
            resolve(temp)
        }catch(err){
            reject(err)
        }
    })
}


export default router;