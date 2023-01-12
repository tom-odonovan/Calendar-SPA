const express = require("express")
const db = require('../db/db')
const router = express.Router()
const bcrypt = require('bcrypt')

function checkLoggedIn(req, res, next) {
        if (!req.session.name) {
            return res.status(401).json({ message: "Not logged in"})
        }

        next()
    }


router.route('/')
    .get((req, res) => { 
        res.json({
                user_id: req.session.user_id,
                email: req.session.email,
                name: req.session.name
            })})

    .post((req, res) => {
        //GET THE LOG IN DETAILS
        const { email, password_hash } = req.body
        
        
        //GET ALL LOGIN CREDENTIALS FROM DB
        const sqlGet = 'SELECT * FROM users'
        db.query(sqlGet).then((dbRes) => {
            const { rows } = dbRes
            
            //FILTER OUT EMAIL
            const userData = rows.filter(data => data['email'] === email)
            
            console.log(userData)
            //VERIFY LOGIN EXISTS
            if (!userData[0]) {
                return res.status(404).json({ message: "Youll need to signup" })
            } 
            //VERIFY PASSWORD MATCHES
            
            if(!bcrypt.compareSync(password_hash, userData[0]['password_hash'])){
                    return res.status(401).json({ message: "Incorrect Password" })
                } 
            //SET SESSION DETAILS
            req.session.email = email
            req.session.user_id = userData[0]['id']
            req.session.name = userData[0]['name']
            res.status(200).json({ message: "Logged in" })
            // console.log(req.session)
        })
    })
    .delete(checkLoggedIn, (req, res) => {
        req.session.destroy()
        res.json({ message: "Logged out" })
    })
   


module.exports = router;