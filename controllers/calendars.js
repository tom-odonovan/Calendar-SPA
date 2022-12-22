const express = require("express")
const db = require('../db/db.js')
const router = express.Router()



//ALL USER CALENDARS 
router.route('/:id')

    .get((req, res) => {
        const id = req.params.id
        const sql = 'SELECT * FROM calendars WHERE id=$1'
        db.query(sql, [id]).then((dbResult) => {    
            const { rows, command, columns } = dbResult
            res.json(rows)
        })
    })

    .post(( req, res) => {
        
    })


module.exports = router;