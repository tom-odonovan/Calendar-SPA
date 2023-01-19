const express = require("express")
const db = require('../db/db')
const router = express.Router()



//EVENTS IN GENERAL
router.route('/')
    //Get all events in Database
    .get((req, res) => {
        const sql = "SELECT * FROM events;";
        db.query(sql).then(({ rows }) => {
            res.json({ events: rows })
        })
    })

    // Add new event
    .post((req, res) => {

        // Get input from request body
        const newEvent = req.body

        let { user_id, calendar_id,
            title, date,
            start_time, end_time, location, description } = newEvent
        console.log(newEvent);
        // Check input is valid
        if (!title) {
            title = "New Event"
        }

        if (!date || !start_time ) {
            res.status(400).json({ "success": false, "message": "Missing date, or start time" })
            return;
        } else if (title.length > 50 || location.length > 100 || description.length > 300) {
            res.status(400).json({ "success": false, "Error": "title, location or description too long" })
            return;
        }

        // Create new event 
        const values = [user_id, calendar_id, title, date, start_time, location, description]

        const sql = 'INSERT INTO events (user_id, calendar_id, title, date, start_time, location, description) VALUES($1, $2, $3, $4, $5, $6, $7)';
        console.log(sql);
        db.query(sql, values).then((dbRes) => {
            res.json({ "success": true, "message": "New event added successfuly" })
        }).catch((err) => {
            res.status(500).json({ "success": false, "Error": "Database failure" })  
        }) 

    })



//SPECIFIC EVENTS
router.route('/:id')
    // Get event by User Id
    .get((req, res) => {
        const id = req.params.id
        const sql = 'SELECT * FROM events WHERE user_id=$1 ORDER BY start_time' // <--- Ensures events are rendered in Chron. order
        db.query(sql, [id]).then((dbResult) => {
            const { rows, command, columns } = dbResult

            if (rows) {
                res.json(rows)
            } else {
                res.status(404).json({ "success": false, "Error": "Not found" })
            }
             
        }) 
    })

    // Delete specific event 
    .delete((req, res) => {
        const id = req.params.id
        const sql = 'DELETE FROM events WHERE id=$1';
        db.query(sql, [id]).then((dbRes) => {
            res.json({ success: true, "message": `Event "deleted successfuly` })
        })
    })

    // Update specific event 
    .put((req, res) => {
        const id = req.params.id
        let updatedEvent = req.body
        const { calendar_id, title, date, start_time, end_time, location, description } = updatedEvent
        const values = [id, calendar_id, title, date, start_time, end_time, location, description]
        const sql = 'UPDATE events SET calendar_id=$2, title=$3, date=$4, start_time=$5, end_time=$6, location=$7, description=$8 WHERE id=$1'
        db.query(sql, values)
            res.json({ "success": true, "message": "Event updated successfuly" }) 
    })


module.exports = router;