const express = require("express")
const db = require('../db/db')
const router = express.Router()

router.route('/')


    .post(( req, res) => {
        const { name, email, password } = req.body
        const sqlGet = `SELECT * FROM users`;

        const sql = `INSERT INTO users (name, email, password) VALUES($1, $2, $3)`;
        db.query(sql, [name, email, password]).then((dbRes) => {
    
            res.json({ success: true })
        })

        
    })



module.exports = router;