const express = require("express")
const db = require('../db/db')
const router = express.Router()

router.route('/')

    .get((req, res) => {
        const sql = 'SELECT * FROM users';

        db.query(sql).then((dbRes) => {
            const { rows } = dbRes
            res.json(rows)
    })})
    .post(( req, res) => {
        const { name, email, password } = req.body

        //GET CURRENT USERS TO COMPARE SIGNUP DATA WITH
        const emailsUsed = []
        const sqlGet = `SELECT * FROM users`;
        db.query(sqlGet).then((dbRes) => {
            //UNPACK DATA
            const { rows } = dbRes
            rows.forEach((data) => {
                const inUseEmail = data['email']
                console.log(inUseEmail)
                emailsUsed.push(inUseEmail) 
                
            })
            //VALIDATE DATA 
            if (name.length === 0 || email.length === 0 || password.length === 0) {
                res.status(400).send("Oh uh, something went wrong")
                return
            }
            if (password.length < 8) {
                res.status(400).send("Oh uh, something went wrong")
                return
            }
            if (emailsUsed.includes(email)) {
                res.status(403).send("Oh uh, something went wrong")
                return
            }
            //IF SIGNUP IS NEW USER DATA INSERT INTO USERS TABLE
            else {
                const sql = `INSERT INTO users (name, email, password_hash) VALUES($1, $2, $3)`;
                db.query(sql, [name, email, password]).then((dbRes) => {
                    
                    res.status(200).json({ success: true })
                })
            }
        })

        
    })



module.exports = router;