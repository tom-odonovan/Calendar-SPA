const express = require("express")
const db = require('../db/db')
const router = express.Router()



//EVENTS IN GENERAL
router.route('/')
    //Get all events from specific calendar
    .get((req, res) => {

    })

    .post((req, res) => {

    })



//SPECIFIC EVENT
router.route('/:date')

    .get((req, res) => {
        const id = req.params.date
        const sql = 'SELECT * FROM events WHERE id=$1'
        db.query(sql, [id]).then((dbResult) => {
            const { rows, command, columns } = dbResult
            res.json(rows)
        })
    })

    .delete((req, res) => {
        const id = req.params.id
        const sql = 'DELETE FROM events WHERE id=$1';
        db.query(sql, [id])
            .then((dbRes) => {
                res.json({ success: true });
            });
    })

    .post((req, res) => {
        const { user_id, calendar_id,
                title, date,
                start_time, end_time } = req.body

        const sql = `INSERT INTO events (user_id, calendar_id, title, date, start_time, end_time) VALUES($1, $2, $3, $4, $5, $6)`;
        db.query(sql, [user_id, calendar_id, title, date, start_time, end_time]).then((dbRes) => {

            res.json({ success: true })
        })
    })

module.exports = router;