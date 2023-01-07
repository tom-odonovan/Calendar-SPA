require("dotenv").config()
const express = require("express")
const expressSession = require("express-session")
const usersRouter = require("./controllers/users")
const sessionsRouter = require("./controllers/sessions")
const eventsRouter = require("./controllers/events")
const calendarsRouter = require("./controllers/calendars")
const bodyParser = require("body-parser")
const db = require("./db/db")
const pgSession = require("connect-pg-simple")(expressSession)


const app = express();

const PORT = 3000;

app.use(bodyParser.json())
app.use('/', express.static('static'))
app.use(expressSession({
    store: new pgSession({
        pool: db,
        createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    
}))

app.use("/api/events", eventsRouter)
app.use("/api/users", usersRouter)
app.use("/api/calendars", calendarsRouter)
app.use("/api/sessions", sessionsRouter)





app.listen(PORT, () => {
    console.log(`Listening at localhost:${PORT}`)
})     