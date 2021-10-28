import * as express from 'express';
import { isNullishCoalesce } from 'typescript';
const cheeses = require('./data/cheeses.json');
const filename = './history.json';
const historyRecords = require('./history.json');
const m = require('./middlewares');
const helper = require('./helper.js');
const router = express.Router();


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

function inserthistoryRecord(newhistoryRecord:object) {
    return new Promise((resolve,reject) => {
        try{
            const id =  helper.getNewId(historyRecords)
            const temp = { "key": id, "goods": newhistoryRecord }
            historyRecords.push(temp)
            helper.writeJSONFile(filename,historyRecords)
            resolve([historyRecords])
        }catch(err){
            reject(err)
        }
    })
}


router.get('/api/cheeses', (req, res, next) => {
    res.json(cheeses);
});

/* Get all history */
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

/* Insert a new history */
router.post('/api/history',  async (req, res) => {
    await inserthistoryRecord(req.body)
    .then((post:any) => res.status(201).json({
        message: `The post #${post} has been updated`,
        content: post
    }))
    .catch((err:any) => res.status(500).json({ message: err.message }))
})



export default router;