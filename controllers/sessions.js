const express = require("express")
const db = require('../db/db')
const router = express.Router()

function checkLoggedIn(req, res, next) {
    if (!req.session.userName) {
        return res.status(401).json({ message: "Not logged in"})
    }

    next()
}

router.route('/')
    .get((req, res) => {
        res.json()
    })
    .post((req, res) => {

        const { email, password_hash } = req.body

        const sqlGet = 'SELECT * FROM users'
        db.query(sqlGet).then((dbRes) => {
            const { rows } = dbRes
            // console.log(rows)
            const userData = rows.filter(data => data['email'] === email)
            console.log(userData)

            if (!userData[0]) {
                return res.status(404).json({ message: "Youll need to signup" })
            } 
            if(password_hash !== userData[0]['password_hash']){
                return res.status(401).json({ message: "Incorrect Password" })
            } 
            
            req.session.email = email
            req.session.name = userData['name']
            res.status(200).json({ message: "Logged in" })
        })
    })
    .delete(checkLoggedIn, (req, res) => {
        req.session.destroy()
        res.json({ message: "Logged out" })
    })

// .delete("/api/sessions", checkLoggedIn, (req, res) => {
//     req.session.destroy()
//     res.json({ message: "Logged out" })
// })     


module.exports = router;